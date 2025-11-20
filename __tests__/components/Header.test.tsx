import { render, screen } from '@testing-library/react';
import { Header } from '@/components/Header';

jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

jest.mock('@/components/Header/ModeToggle', () => ({
  ModeToggle: () => <div data-testid="mode-toggle">Mode Toggle</div>,
}));

describe('Header', () => {
  it('should render the header', () => {
    render(<Header />);
    
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });

  it('should render GitHub logo link', () => {
    render(<Header />);
    
    const logoLink = screen.getByRole('link', { name: '' });
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('should render ModeToggle component', () => {
    render(<Header />);
    
    expect(screen.getByTestId('mode-toggle')).toBeInTheDocument();
  });

  it('should have correct CSS classes', () => {
    render(<Header />);
    
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('flex', 'items-center', 'justify-between');
  });

  it('should render SVG logo', () => {
    render(<Header />);
    
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
  });
});

