import { render, screen } from '@testing-library/react';
import UserProfile from '@/components/UserProfile';
import { GHUser, GHRepo } from '@/lib/gh/types';

jest.mock('@/components/UserProfile/UserCard', () => ({
  UserCard: ({ user }: { user: GHUser }) => (
    <div data-testid="user-card">{user.login}</div>
  ),
}));

jest.mock('@/components/UserProfile/ChartCard', () => ({
  ChartCard: ({ byLanguageCount, starsByLanguage }: any) => (
    <div data-testid="chart-card">
      Languages: {Object.keys(byLanguageCount).length}, Stars: {Object.keys(starsByLanguage).length}
    </div>
  ),
}));

jest.mock('@/components/UserProfile/ReposCard', () => ({
  ReposCard: ({ repos }: { repos: GHRepo[] }) => (
    <div data-testid="repos-card">Repos: {repos.length}</div>
  ),
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
];

const mockByLanguageCount = {
  TypeScript: 1,
  JavaScript: 2,
};

const mockStarsByLanguage = {
  TypeScript: 10,
  JavaScript: 20,
};

describe('UserProfile', () => {
  it('should render all child components', () => {
    render(
      <UserProfile
        user={mockUser}
        repos={mockRepos}
        byLanguageCount={mockByLanguageCount}
        starsByLanguage={mockStarsByLanguage}
      />
    );

    expect(screen.getByTestId('user-card')).toBeInTheDocument();
    expect(screen.getByTestId('chart-card')).toBeInTheDocument();
    expect(screen.getByTestId('repos-card')).toBeInTheDocument();
  });

  it('should pass correct props to UserCard', () => {
    render(
      <UserProfile
        user={mockUser}
        repos={mockRepos}
        byLanguageCount={mockByLanguageCount}
        starsByLanguage={mockStarsByLanguage}
      />
    );

    expect(screen.getByTestId('user-card')).toHaveTextContent('octocat');
  });

  it('should pass correct props to ChartCard', () => {
    render(
      <UserProfile
        user={mockUser}
        repos={mockRepos}
        byLanguageCount={mockByLanguageCount}
        starsByLanguage={mockStarsByLanguage}
      />
    );

    expect(screen.getByTestId('chart-card')).toHaveTextContent('Languages: 2');
    expect(screen.getByTestId('chart-card')).toHaveTextContent('Stars: 2');
  });

  it('should pass correct props to ReposCard', () => {
    render(
      <UserProfile
        user={mockUser}
        repos={mockRepos}
        byLanguageCount={mockByLanguageCount}
        starsByLanguage={mockStarsByLanguage}
      />
    );

    expect(screen.getByTestId('repos-card')).toHaveTextContent('Repos: 1');
  });

  it('should render with empty repos array', () => {
    render(
      <UserProfile
        user={mockUser}
        repos={[]}
        byLanguageCount={mockByLanguageCount}
        starsByLanguage={mockStarsByLanguage}
      />
    );

    expect(screen.getByTestId('repos-card')).toHaveTextContent('Repos: 0');
  });

  it('should render with empty language counts', () => {
    render(
      <UserProfile
        user={mockUser}
        repos={mockRepos}
        byLanguageCount={{}}
        starsByLanguage={{}}
      />
    );

    expect(screen.getByTestId('chart-card')).toHaveTextContent('Languages: 0');
    expect(screen.getByTestId('chart-card')).toHaveTextContent('Stars: 0');
  });
});

