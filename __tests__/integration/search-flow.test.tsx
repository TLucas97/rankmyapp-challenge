import Home from '@/app/page';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.mock('@/lib/gh', () => ({
  getUser: jest.fn(),
  getRepos: jest.fn(),
}));

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
  redirect: jest.fn(),
}));

describe('Search Flow Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should complete full search flow: input -> submit -> navigate', async () => {
    const user = userEvent.setup();
    render(<Home />);

    expect(screen.getByPlaceholderText('Enter GitHub username...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();

    const input = screen.getByPlaceholderText('Enter GitHub username...');
    await user.type(input, 'octocat');
    expect(input).toHaveValue('octocat');

    const button = screen.getByRole('button', { name: /search/i });
    await user.click(button);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/p/octocat');
    });
  });

  it('should handle search with whitespace correctly', async () => {
    const user = userEvent.setup();
    render(<Home />);

    const input = screen.getByPlaceholderText('Enter GitHub username...');
    await user.type(input, '  octocat  ');

    const button = screen.getByRole('button', { name: /search/i });
    await user.click(button);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/p/octocat');
    });
  });

  it('should handle search with special characters', async () => {
    const user = userEvent.setup();
    render(<Home />);

    const input = screen.getByPlaceholderText('Enter GitHub username...');
    await user.type(input, 'user-name');

    const button = screen.getByRole('button', { name: /search/i });
    await user.click(button);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/p/user-name');
    });
  });

  it('should prevent navigation with empty input', async () => {
    const user = userEvent.setup();
    render(<Home />);

    const button = screen.getByRole('button', { name: /search/i });
    await user.click(button);

    await waitFor(() => {
      expect(mockPush).not.toHaveBeenCalled();
    });
  });

  it('should handle Enter key submission', async () => {
    const user = userEvent.setup();
    render(<Home />);

    const input = screen.getByPlaceholderText('Enter GitHub username...');
    await user.type(input, 'octocat{Enter}');

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/p/octocat');
    });
  });

  it('should handle multiple rapid submissions', async () => {
    const user = userEvent.setup();
    render(<Home />);

    const input = screen.getByPlaceholderText('Enter GitHub username...');
    const button = screen.getByRole('button', { name: /search/i });

    await user.type(input, 'octocat');
    await user.click(button);
    await user.click(button);
    await user.click(button);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledTimes(3);
    });
  });
});

