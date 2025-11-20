import { UserCard } from '@/components/UserProfile/UserCard';
import { GHUser } from '@/lib/gh/types';
import { render, screen } from '@testing-library/react';

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

describe('UserCard', () => {
  it('should render user information correctly', () => {
    render(<UserCard user={mockUser} />);

    expect(screen.getByText('octocat')).toBeInTheDocument();
    expect(screen.getByText('GitHub\'s mascot')).toBeInTheDocument();
    expect(screen.getByText('1000')).toBeInTheDocument();
    expect(screen.getByText('500')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('should render user avatar with correct alt text', () => {
    render(<UserCard user={mockUser} />);

    const avatar = screen.getByAltText('octocat avatar');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', mockUser.avatar_url);
  });

  it('should render followers link with correct href', () => {
    render(<UserCard user={mockUser} />);

    const followersLink = screen.getByText(/1000/).closest('a');
    expect(followersLink).toHaveAttribute('href', 'https://github.com/octocat?tab=followers');
    expect(followersLink).toHaveAttribute('target', '_blank');
  });

  it('should render following link with correct href', () => {
    render(<UserCard user={mockUser} />);

    const followingLinks = screen.getAllByText(/500/);
    const followingLink = followingLinks.find(link =>
      link.closest('a')?.getAttribute('href')?.includes('following')
    )?.closest('a');

    expect(followingLink).toHaveAttribute('href', 'https://github.com/octocat?tab=following');
    expect(followingLink).toHaveAttribute('target', '_blank');
  });

  it('should render repositories link with correct href', () => {
    render(<UserCard user={mockUser} />);

    const reposLink = screen.getByRole('link', { name: /repositories/i });
    expect(reposLink).toHaveAttribute('href', 'https://github.com/octocat?tab=repositories');
    expect(reposLink).toHaveAttribute('target', '_blank');
  });

  it('should not render bio when bio is null', () => {
    const userWithoutBio: GHUser = {
      ...mockUser,
      bio: null,
    };

    render(<UserCard user={userWithoutBio} />);

    expect(screen.queryByText('GitHub\'s mascot')).not.toBeInTheDocument();
    expect(screen.getByText('octocat')).toBeInTheDocument();
  });

  it('should handle user with empty bio', () => {
    const userWithEmptyBio: GHUser = {
      ...mockUser,
      bio: '',
    };

    render(<UserCard user={userWithEmptyBio} />);

    expect(screen.getByText('octocat')).toBeInTheDocument();
  });

  it('should render all user stats correctly', () => {
    render(<UserCard user={mockUser} />);

    expect(screen.getByText('1000')).toBeInTheDocument();
    expect(screen.getByText('500')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });
});

