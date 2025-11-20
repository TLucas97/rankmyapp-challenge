import { ReposCard } from '@/components/UserProfile/ReposCard';
import { makeFakeRepo } from '@/lib/gh/fake';
import { GHRepo } from '@/lib/gh/types';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.mock('@/lib/gh/fake', () => ({
  makeFakeRepo: jest.fn(),
}));

const mockRepos: GHRepo[] = [
  {
    id: 1,
    name: 'repo1',
    description: 'First repository',
    stargazers_count: 10,
    language: 'TypeScript',
    html_url: 'https://github.com/user/repo1',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 2,
    name: 'repo2',
    description: 'Second repository',
    stargazers_count: 5,
    language: 'JavaScript',
    html_url: 'https://github.com/user/repo2',
    updated_at: '2024-01-02T00:00:00Z',
  },
];

describe('ReposCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should render the title and repositories', () => {
    render(<ReposCard repos={mockRepos} />);

    expect(screen.getByText('Repositories')).toBeInTheDocument();
    expect(screen.getByText('repo1')).toBeInTheDocument();
    expect(screen.getByText('repo2')).toBeInTheDocument();
  });

  it('should render "No repositories found" when repos array is empty', () => {
    render(<ReposCard repos={[]} />);

    expect(screen.getByText('Repositories')).toBeInTheDocument();
    expect(screen.getByText('No repositories found')).toBeInTheDocument();
  });

  it('should render add button', () => {
    render(<ReposCard repos={mockRepos} />);

    const addButton = screen.getByRole('button', { name: /add new repository/i });
    expect(addButton).toBeInTheDocument();
  });

  it('should add a new repository when add button is clicked', async () => {
    const user = userEvent.setup({ delay: null });
    const newRepo: GHRepo = {
      id: 3,
      name: 'new-repo',
      description: 'New repository',
      stargazers_count: 0,
      language: 'Python',
      html_url: 'https://github.com/user/new-repo',
      updated_at: '2024-01-03T00:00:00Z',
    };

    (makeFakeRepo as jest.Mock).mockReturnValue(newRepo);

    render(<ReposCard repos={mockRepos} />);

    const addButton = screen.getByRole('button', { name: /add new repository/i });
    await user.click(addButton);

    await waitFor(() => {
      expect(screen.getByText('new-repo')).toBeInTheDocument();
    });

    expect(makeFakeRepo).toHaveBeenCalledTimes(1);
  });

  it('should add new repository at the beginning of the list', async () => {
    const user = userEvent.setup({ delay: null });
    const newRepo: GHRepo = {
      id: 3,
      name: 'new-repo',
      description: 'New repository',
      stargazers_count: 0,
      language: 'Python',
      html_url: 'https://github.com/user/new-repo',
      updated_at: '2024-01-03T00:00:00Z',
    };

    (makeFakeRepo as jest.Mock).mockReturnValue(newRepo);

    render(<ReposCard repos={mockRepos} />);

    const addButton = screen.getByRole('button', { name: /add new repository/i });
    await user.click(addButton);

    await waitFor(() => {
      const repos = screen.getAllByText(/repo/);
      expect(repos[0]).toHaveTextContent('new-repo');
    });
  });

  it('should add a new repository every 30 seconds', async () => {
    const user = userEvent.setup({ delay: null });
    const newRepo1: GHRepo = {
      id: 3,
      name: 'auto-repo-1',
      description: 'Auto repository 1',
      stargazers_count: 0,
      language: 'Python',
      html_url: 'https://github.com/user/auto-repo-1',
      updated_at: '2024-01-03T00:00:00Z',
    };
    const newRepo2: GHRepo = {
      id: 4,
      name: 'auto-repo-2',
      description: 'Auto repository 2',
      stargazers_count: 0,
      language: 'Python',
      html_url: 'https://github.com/user/auto-repo-2',
      updated_at: '2024-01-03T00:00:00Z',
    };

    (makeFakeRepo as jest.Mock)
      .mockReturnValueOnce(newRepo1)
      .mockReturnValueOnce(newRepo2);

    render(<ReposCard repos={mockRepos} />);

    act(() => {
      jest.advanceTimersByTime(30000);
    });

    await waitFor(() => {
      expect(screen.getByText('auto-repo-1')).toBeInTheDocument();
    });

    act(() => {
      jest.advanceTimersByTime(30000);
    });

    await waitFor(() => {
      expect(screen.getByText('auto-repo-2')).toBeInTheDocument();
    });

    expect(makeFakeRepo).toHaveBeenCalledTimes(2);
  });

  it('should clean up interval on unmount', () => {
    const { unmount } = render(<ReposCard repos={mockRepos} />);

    const clearIntervalSpy = jest.spyOn(global, 'clearInterval');

    unmount();

    expect(clearIntervalSpy).toHaveBeenCalled();

    clearIntervalSpy.mockRestore();
  });

  it('should render repository details correctly', () => {
    render(<ReposCard repos={mockRepos} />);

    expect(screen.getByText('repo1')).toBeInTheDocument();
    expect(screen.getByText('First repository')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });
});

