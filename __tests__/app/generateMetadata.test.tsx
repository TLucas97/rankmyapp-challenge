import { generateMetadata } from '@/app/p/[username]/page';
import { getUser } from '@/lib/gh';

jest.mock('@/lib/gh', () => ({
    getUser: jest.fn(),
    getRepos: jest.fn(),
}));

const mockUser = {
    login: 'octocat',
    avatar_url: 'https://github.com/images/error/octocat_happy.gif',
    name: 'The Octocat',
    bio: 'GitHub\'s mascot',
    followers: 1000,
    following: 500,
    public_repos: 10,
    html_url: 'https://github.com/octocat',
};

describe('generateMetadata', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should generate metadata with user name when available', async () => {
        (getUser as jest.Mock).mockResolvedValue(mockUser);

        const params = Promise.resolve({ username: 'octocat' });
        const metadata = await generateMetadata({ params });

        expect(metadata.title).toBe('The Octocat (@octocat) - GitHub Insights');
        expect(metadata.description).toContain('GitHub\'s mascot');
        expect(metadata.description).toContain('1000 followers');
        expect(metadata.description).toContain('10 public repositories');
    });

    it('should generate metadata without user name when name is null', async () => {
        const userWithoutName = {
            ...mockUser,
            name: null,
        };
        (getUser as jest.Mock).mockResolvedValue(userWithoutName);

        const params = Promise.resolve({ username: 'octocat' });
        const metadata = await generateMetadata({ params });

        expect(metadata.title).toBe('octocat - GitHub Insights');
    });

    it('should generate metadata with bio when available', async () => {
        (getUser as jest.Mock).mockResolvedValue(mockUser);

        const params = Promise.resolve({ username: 'octocat' });
        const metadata = await generateMetadata({ params });

        expect(metadata.description).toContain('GitHub\'s mascot');
    });

    it('should generate metadata without bio when bio is null', async () => {
        const userWithoutBio = {
            ...mockUser,
            bio: null,
        };
        (getUser as jest.Mock).mockResolvedValue(userWithoutBio);

        const params = Promise.resolve({ username: 'octocat' });
        const metadata = await generateMetadata({ params });

        expect(metadata.description).toContain('GitHub profile of octocat');
        expect(metadata.description).toContain('1000 followers');
        expect(metadata.description).toContain('500 following');
        expect(metadata.description).toContain('10 public repositories');
    });

    it('should include OpenGraph metadata', async () => {
        (getUser as jest.Mock).mockResolvedValue(mockUser);

        const params = Promise.resolve({ username: 'octocat' });
        const metadata = await generateMetadata({ params });

        expect(metadata.openGraph).toBeDefined();
        expect(metadata.openGraph?.title).toBe('The Octocat (@octocat) - GitHub Insights');
        expect(metadata.openGraph?.description).toContain('GitHub\'s mascot');
        expect((metadata.openGraph as any)?.type).toBe('profile');
        expect(metadata.openGraph?.images).toBeDefined();
        const images = Array.isArray(metadata.openGraph?.images)
            ? metadata.openGraph.images
            : metadata.openGraph?.images
                ? [metadata.openGraph.images]
                : [];
        expect(images).toHaveLength(1);
        const firstImage = images[0];
        const imageUrl = typeof firstImage === 'string' ? firstImage : (firstImage as any)?.url;
        expect(imageUrl).toBe(mockUser.avatar_url);
        expect(metadata.openGraph?.url).toBe('https://github.com/octocat');
        expect(metadata.openGraph?.siteName).toBe('GitHub Insights');
    });

    it('should include Twitter metadata', async () => {
        (getUser as jest.Mock).mockResolvedValue(mockUser);

        const params = Promise.resolve({ username: 'octocat' });
        const metadata = await generateMetadata({ params });

        expect(metadata.twitter).toBeDefined();
        expect((metadata.twitter as any)?.card).toBe('summary');
        expect(metadata.twitter?.title).toBe('The Octocat (@octocat) - GitHub Insights');
        expect(metadata.twitter?.images).toEqual([mockUser.avatar_url]);
    });

    it('should include canonical URL', async () => {
        (getUser as jest.Mock).mockResolvedValue(mockUser);

        const params = Promise.resolve({ username: 'octocat' });
        const metadata = await generateMetadata({ params });

        expect(metadata.alternates?.canonical).toBe('https://github.com/octocat');
    });

    it('should decode URL-encoded username', async () => {
        const userWithEncodedName = {
            ...mockUser,
            login: 'user name',
            name: 'User Name',
        };
        (getUser as jest.Mock).mockResolvedValue(userWithEncodedName);

        const params = Promise.resolve({ username: 'user%20name' });
        const metadata = await generateMetadata({ params });

        expect(getUser).toHaveBeenCalledWith('user name');
        expect(metadata.title).toContain('user name');
    });

    it('should handle errors gracefully', async () => {
        (getUser as jest.Mock).mockRejectedValue(new Error('User not found'));

        const params = Promise.resolve({ username: 'nonexistent' });
        const metadata = await generateMetadata({ params });

        expect(metadata.title).toBe('nonexistent - GitHub Insights');
        expect(metadata.description).toBe('GitHub profile insights for nonexistent');
    });

    it('should handle errors with URL-encoded username', async () => {
        (getUser as jest.Mock).mockRejectedValue(new Error('User not found'));

        const params = Promise.resolve({ username: 'user%20name' });
        const metadata = await generateMetadata({ params });

        expect(metadata.title).toBe('user name - GitHub Insights');
        expect(metadata.description).toBe('GitHub profile insights for user name');
    });
});

