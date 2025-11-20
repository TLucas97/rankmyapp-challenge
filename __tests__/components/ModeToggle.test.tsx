import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ModeToggle } from '@/components/Header/ModeToggle';

const mockSetTheme = jest.fn();
jest.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: mockSetTheme,
    resolvedTheme: 'light',
    themes: ['light', 'dark', 'system'],
  }),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => children,
}));

describe('ModeToggle', () => {
  beforeEach(() => {
    mockSetTheme.mockClear();
  });

  it('should render the toggle button', () => {
    render(<ModeToggle />);
    
    const button = screen.getByRole('button', { name: /toggle theme/i });
    expect(button).toBeInTheDocument();
  });

  it('should open dropdown menu when button is clicked', async () => {
    const user = userEvent.setup();
    render(<ModeToggle />);
    
    const button = screen.getByRole('button', { name: /toggle theme/i });
    await user.click(button);
    
    expect(screen.getByText('Light')).toBeInTheDocument();
    expect(screen.getByText('Dark')).toBeInTheDocument();
    expect(screen.getByText('System')).toBeInTheDocument();
  });

  it('should call setTheme with "light" when Light option is clicked', async () => {
    const user = userEvent.setup();
    render(<ModeToggle />);
    
    const button = screen.getByRole('button', { name: /toggle theme/i });
    await user.click(button);
    
    const lightOption = screen.getByText('Light');
    await user.click(lightOption);
    
    expect(mockSetTheme).toHaveBeenCalledWith('light');
  });

  it('should call setTheme with "dark" when Dark option is clicked', async () => {
    const user = userEvent.setup();
    render(<ModeToggle />);
    
    const button = screen.getByRole('button', { name: /toggle theme/i });
    await user.click(button);
    
    const darkOption = screen.getByText('Dark');
    await user.click(darkOption);
    
    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });

  it('should call setTheme with "system" when System option is clicked', async () => {
    const user = userEvent.setup();
    render(<ModeToggle />);
    
    const button = screen.getByRole('button', { name: /toggle theme/i });
    await user.click(button);
    
    const systemOption = screen.getByText('System');
    await user.click(systemOption);
    
    expect(mockSetTheme).toHaveBeenCalledWith('system');
  });
});

