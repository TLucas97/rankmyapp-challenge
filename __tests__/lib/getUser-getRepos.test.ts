import { getRepos, getUser } from '@/lib/gh';
import { api } from '@/lib/gh/api';
import { GHRepo, GHUser } from '@/lib/gh/types';

jest.mock('@/lib/gh/api', () => ({
    api: {
        get: jest.fn(),
    },
}));

const mockUser: GHUser = {
    login: 'octocat',
    avatar_url: 'https://github.com/images/error/octocat_happy.gif',
    name: 'The Octocat',
    bio: 'GitHub\'s mascot',
    followers: 1000,
    following: 500,
    public_repos: 10,
    html_url: 'https://github.com/octocat',
};

const mockRepos: GHRepo[] = [
    {
        id: 1,
        name: 'repo1',
        description: 'First repo',
        stargazers_count: 10,
        language: 'TypeScript',
        html_url: 'https://github.com/octocat/repo1',
        updated_at: '2024-01-01T00:00:00Z',
    },
    {
        id: 2,
        name: 'repo2',
        description: 'Second repo',
        stargazers_count: 5,
        language: 'JavaScript',
        html_url: 'https://github.com/octocat/repo2',
        updated_at: '2024-01-02T00:00:00Z',
    },
];

describe('getUser', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(console, 'log').mockImplementation(() => { });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should fetch user data successfully', async () => {
        (api.get as jest.Mock).mockResolvedValue({
            data: mockUser,
            cached: false,
        });

        const result = await getUser('octocat');

        expect(api.get).toHaveBeenCalledWith('/users/octocat', {
            cache: {
                ttl: 10 * 60 * 1000,
            },
        });
        expect(result).toEqual(mockUser);
    });

    it('should return cached user data', async () => {
        (api.get as jest.Mock).mockResolvedValue({
            data: mockUser,
            cached: true,
        });

        const result = await getUser('octocat');

        expect(result).toEqual(mockUser);
        expect(api.get).toHaveBeenCalledWith('/users/octocat', {
            cache: {
                ttl: 10 * 60 * 1000,
            },
        });
    });

    it('should log cache status in development mode', async () => {
        const originalEnv = process.env.NODE_ENV;
        const envSpy = jest.replaceProperty(process, 'env', {
            ...process.env,
            NODE_ENV: 'development',
        });

        (api.get as jest.Mock).mockResolvedValue({
            data: mockUser,
            cached: true,
        });

        await getUser('octocat');

        expect(console.log).toHaveBeenCalledWith('[getUser] octocat - cached: true');

        envSpy.restore();
    });

    it('should not log in production mode', async () => {
        const originalEnv = process.env.NODE_ENV;
        const envSpy = jest.replaceProperty(process, 'env', {
            ...process.env,
            NODE_ENV: 'production',
        });

        (api.get as jest.Mock).mockResolvedValue({
            data: mockUser,
            cached: false,
        });

        await getUser('octocat');

        expect(console.log).not.toHaveBeenCalled();

        envSpy.restore();
    });

    it('should handle API errors', async () => {
        const error = new Error('User not found');
        (api.get as jest.Mock).mockRejectedValue(error);

        await expect(getUser('nonexistent')).rejects.toThrow('User not found');
    });
});

describe('getRepos', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(console, 'log').mockImplementation(() => { });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should fetch repos data successfully', async () => {
        (api.get as jest.Mock).mockResolvedValue({
            data: mockRepos,
            cached: false,
        });

        const result = await getRepos('octocat');

        expect(api.get).toHaveBeenCalledWith(
            '/users/octocat/repos?per_page=100&sort=updated',
            {
                cache: {
                    ttl: 5 * 60 * 1000,
                },
            }
        );
        expect(result).toEqual(mockRepos);
    });

    it('should return cached repos data', async () => {
        (api.get as jest.Mock).mockResolvedValue({
            data: mockRepos,
            cached: true,
        });

        const result = await getRepos('octocat');

        expect(result).toEqual(mockRepos);
        expect(api.get).toHaveBeenCalledWith(
            '/users/octocat/repos?per_page=100&sort=updated',
            {
                cache: {
                    ttl: 5 * 60 * 1000,
                },
            }
        );
    });

    it('should log cache status in development mode', async () => {
        const originalEnv = process.env.NODE_ENV;
        const envSpy = jest.replaceProperty(process, 'env', {
            ...process.env,
            NODE_ENV: 'development',
        });

        (api.get as jest.Mock).mockResolvedValue({
            data: mockRepos,
            cached: false,
        });

        await getRepos('octocat');

        expect(console.log).toHaveBeenCalledWith('[getRepos] octocat - cached: false');

        envSpy.restore();
    });

    it('should not log in production mode', async () => {
        const originalEnv = process.env.NODE_ENV;
        const envSpy = jest.replaceProperty(process, 'env', {
            ...process.env,
            NODE_ENV: 'production',
        });

        (api.get as jest.Mock).mockResolvedValue({
            data: mockRepos,
            cached: true,
        });

        await getRepos('octocat');

        expect(console.log).not.toHaveBeenCalled();

        envSpy.restore();
    });

    it('should handle API errors', async () => {
        const error = new Error('Failed to fetch repos');
        (api.get as jest.Mock).mockRejectedValue(error);

        await expect(getRepos('octocat')).rejects.toThrow('Failed to fetch repos');
    });

    it('should return empty array when user has no repos', async () => {
        (api.get as jest.Mock).mockResolvedValue({
            data: [],
            cached: false,
        });

        const result = await getRepos('user-with-no-repos');

        expect(result).toEqual([]);
    });
});

