import { Repository } from '@/components/UserProfile/ReposCard/Repository';
import { GHRepo } from '@/lib/gh/types';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const mockOpen = jest.fn();
window.open = mockOpen;

describe('Repository', () => {
  beforeEach(() => {
    mockOpen.mockClear();
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-01-15T12:00:00Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  const mockRepo: GHRepo = {
    id: 1,
    name: 'test-repo',
    description: 'Test repository description',
    stargazers_count: 42,
    language: 'TypeScript',
    html_url: 'https://github.com/user/test-repo',
    updated_at: '2024-01-10T00:00:00Z',
  };

  it('should render repository name', () => {
    render(<Repository repo={mockRepo} />);
    expect(screen.getByText('test-repo')).toBeInTheDocument();
  });

  it('should render repository description when available', () => {
    render(<Repository repo={mockRepo} />);
    expect(screen.getByText('Test repository description')).toBeInTheDocument();
  });

  it('should not render description when it is null', () => {
    const repoWithoutDescription: GHRepo = {
      ...mockRepo,
      description: null,
    };
    render(<Repository repo={repoWithoutDescription} />);
    expect(screen.queryByText('Test repository description')).not.toBeInTheDocument();
  });

  it('should render language when available', () => {
    render(<Repository repo={mockRepo} />);
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('should not render language when it is null', () => {
    const repoWithoutLanguage: GHRepo = {
      ...mockRepo,
      language: null,
    };
    render(<Repository repo={repoWithoutLanguage} />);
    expect(screen.queryByText('TypeScript')).not.toBeInTheDocument();
  });

  it('should render stargazers count', () => {
    render(<Repository repo={mockRepo} />);
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('should render updated date', () => {
    render(<Repository repo={mockRepo} />);
    expect(screen.getByText(/Updated/i)).toBeInTheDocument();
  });

  it('should open repository URL in new tab when clicked', async () => {
    const user = userEvent.setup({ delay: null });
    render(<Repository repo={mockRepo} />);

    const repoElement = screen.getByText('test-repo').closest('div');
    if (repoElement) {
      await user.click(repoElement);
      expect(mockOpen).toHaveBeenCalledWith('https://github.com/user/test-repo', '_blank');
    }
  });

  it('should handle repository with zero stars', () => {
    const repoWithZeroStars: GHRepo = {
      ...mockRepo,
      stargazers_count: 0,
    };
    render(<Repository repo={repoWithZeroStars} />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });
});

