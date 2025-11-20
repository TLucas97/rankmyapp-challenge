import UserPage from '@/app/p/[username]/page';
import { computeLanguageInsights, getRepos, getUser } from '@/lib/gh';
import { render } from '@testing-library/react';

jest.mock('@/lib/gh', () => ({
  getUser: jest.fn(),
  getRepos: jest.fn(),
  computeLanguageInsights: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  redirect: jest.fn((path: string) => {
    throw new Error(`REDIRECT:${path}`);
  }),
}));

jest.mock('@/components/UserProfile', () => ({
  __esModule: true,
  default: jest.fn(({ user, repos, byLanguageCount, starsByLanguage }) => (
    <div data-testid="user-profile">
      <div data-testid="user-login">{user.login}</div>
      <div data-testid="repos-count">{repos.length}</div>
      <div data-testid="languages-count">{Object.keys(byLanguageCount).length}</div>
      <div data-testid="stars-count">{Object.keys(starsByLanguage).length}</div>
    </div>
  )),
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

const mockRepos = [
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

const mockInsights = {
  byLanguageCount: { TypeScript: 1, JavaScript: 1 },
  starsByLanguage: { TypeScript: 10, JavaScript: 5 },
};

describe('UserPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render user profile when user and repos are fetched successfully', async () => {
    (getUser as jest.Mock).mockResolvedValue(mockUser);
    (getRepos as jest.Mock).mockResolvedValue(mockRepos);
    (computeLanguageInsights as jest.Mock).mockReturnValue(mockInsights);

    const params = Promise.resolve({ username: 'octocat' });
    const result = await UserPage({ params });

    const { container } = render(result);
    expect(container.querySelector('[data-testid="user-profile"]')).toBeInTheDocument();
    expect(container.querySelector('[data-testid="user-login"]')).toHaveTextContent('octocat');
    expect(container.querySelector('[data-testid="repos-count"]')).toHaveTextContent('2');
  });

  it('should decode URL-encoded username', async () => {
    (getUser as jest.Mock).mockResolvedValue(mockUser);
    (getRepos as jest.Mock).mockResolvedValue(mockRepos);
    (computeLanguageInsights as jest.Mock).mockReturnValue(mockInsights);

    const params = Promise.resolve({ username: 'user%20name' });
    await UserPage({ params });

    expect(getUser).toHaveBeenCalledWith('user name');
    expect(getRepos).toHaveBeenCalledWith('user name');
  });

  it('should call computeLanguageInsights with repos', async () => {
    (getUser as jest.Mock).mockResolvedValue(mockUser);
    (getRepos as jest.Mock).mockResolvedValue(mockRepos);
    (computeLanguageInsights as jest.Mock).mockReturnValue(mockInsights);

    const params = Promise.resolve({ username: 'octocat' });
    await UserPage({ params });

    expect(computeLanguageInsights).toHaveBeenCalledWith(mockRepos);
  });

  it('should redirect to /failed when getUser fails', async () => {
    (getUser as jest.Mock).mockRejectedValue(new Error('User not found'));
    (getRepos as jest.Mock).mockResolvedValue(mockRepos);

    const params = Promise.resolve({ username: 'nonexistent' });

    await expect(UserPage({ params })).rejects.toThrow('REDIRECT:/failed');
  });

  it('should redirect to /failed when getRepos fails', async () => {
    (getUser as jest.Mock).mockResolvedValue(mockUser);
    (getRepos as jest.Mock).mockRejectedValue(new Error('Failed to fetch repos'));

    const params = Promise.resolve({ username: 'octocat' });

    await expect(UserPage({ params })).rejects.toThrow('REDIRECT:/failed');
  });

  it('should fetch user and repos in parallel', async () => {
    (getUser as jest.Mock).mockResolvedValue(mockUser);
    (getRepos as jest.Mock).mockResolvedValue(mockRepos);
    (computeLanguageInsights as jest.Mock).mockReturnValue(mockInsights);

    const params = Promise.resolve({ username: 'octocat' });
    await UserPage({ params });

    expect(getUser).toHaveBeenCalled();
    expect(getRepos).toHaveBeenCalled();

    expect(getUser).toHaveBeenCalledWith('octocat');
    expect(getRepos).toHaveBeenCalledWith('octocat');
  });

  it('should pass correct props to UserProfile component', async () => {
    (getUser as jest.Mock).mockResolvedValue(mockUser);
    (getRepos as jest.Mock).mockResolvedValue(mockRepos);
    (computeLanguageInsights as jest.Mock).mockReturnValue(mockInsights);

    const params = Promise.resolve({ username: 'octocat' });
    const result = await UserPage({ params });

    const { container } = render(result);
    expect(container.querySelector('[data-testid="user-login"]')).toHaveTextContent('octocat');
    expect(container.querySelector('[data-testid="repos-count"]')).toHaveTextContent('2');
    expect(container.querySelector('[data-testid="languages-count"]')).toHaveTextContent('2');
  });
});

