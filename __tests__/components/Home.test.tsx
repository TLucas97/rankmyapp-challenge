import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '@/app/page';

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

describe('Home', () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it('should render the title and description', () => {
    render(<Home />);
    
    expect(screen.getByText('GitHub Profile Search')).toBeInTheDocument();
    expect(screen.getByText(/Enter a GitHub username to view their profile and repositories/i)).toBeInTheDocument();
  });

  it('should render the search input and button', () => {
    render(<Home />);
    
    expect(screen.getByPlaceholderText('Enter GitHub username...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('should update input value when typing', async () => {
    const user = userEvent.setup();
    render(<Home />);
    
    const input = screen.getByPlaceholderText('Enter GitHub username...') as HTMLInputElement;
    await user.type(input, 'octocat');
    
    expect(input.value).toBe('octocat');
  });

  it('should navigate to user page when form is submitted with valid username', async () => {
    const user = userEvent.setup();
    render(<Home />);
    
    const input = screen.getByPlaceholderText('Enter GitHub username...');
    const button = screen.getByRole('button', { name: /search/i });
    
    await user.type(input, 'octocat');
    await user.click(button);
    
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/p/octocat');
    });
  });

  it('should trim whitespace from username before navigation', async () => {
    const user = userEvent.setup();
    render(<Home />);
    
    const input = screen.getByPlaceholderText('Enter GitHub username...');
    const button = screen.getByRole('button', { name: /search/i });
    
    await user.type(input, '  octocat  ');
    await user.click(button);
    
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/p/octocat');
    });
  });

  it('should not navigate when username is empty', async () => {
    const user = userEvent.setup();
    render(<Home />);
    
    const button = screen.getByRole('button', { name: /search/i });
    await user.click(button);
    
    await waitFor(() => {
      expect(mockPush).not.toHaveBeenCalled();
    });
  });

  it('should not navigate when username is only whitespace', async () => {
    const user = userEvent.setup();
    render(<Home />);
    
    const input = screen.getByPlaceholderText('Enter GitHub username...');
    const button = screen.getByRole('button', { name: /search/i });
    
    await user.type(input, '   ');
    await user.click(button);
    
    await waitFor(() => {
      expect(mockPush).not.toHaveBeenCalled();
    });
  });

  it('should encode username in URL', async () => {
    const user = userEvent.setup();
    render(<Home />);
    
    const input = screen.getByPlaceholderText('Enter GitHub username...');
    const button = screen.getByRole('button', { name: /search/i });
    
    await user.type(input, 'user name');
    await user.click(button);
    
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/p/user%20name');
    });
  });

  it('should submit form when Enter key is pressed', async () => {
    const user = userEvent.setup();
    render(<Home />);
    
    const input = screen.getByPlaceholderText('Enter GitHub username...');
    await user.type(input, 'octocat{Enter}');
    
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/p/octocat');
    });
  });
});

