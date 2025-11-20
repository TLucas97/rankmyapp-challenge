import { render, screen } from '@testing-library/react';
import FailedPage from '@/app/failed/page';

describe('FailedPage', () => {
  it('should render error message', () => {
    render(<FailedPage />);
    
    expect(screen.getByText(/Oops! Something went wrong/i)).toBeInTheDocument();
    expect(screen.getByText(/We couldn't find the user or an error occurred during the search/i)).toBeInTheDocument();
  });

  it('should render error animation image', () => {
    render(<FailedPage />);
    
    const image = screen.getByAltText('Error animation');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/3o7aCTPPm4OHfRLSH6/giphy.gif');
  });

  it('should render back to home button', () => {
    render(<FailedPage />);
    
    const button = screen.getByRole('link', { name: /back to home/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('href', '/');
  });

  it('should render all required elements', () => {
    render(<FailedPage />);
    
    expect(screen.getByText(/Oops! Something went wrong/i)).toBeInTheDocument();
    expect(screen.getByText(/Please check the username and try again/i)).toBeInTheDocument();
    expect(screen.getByAltText('Error animation')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /back to home/i })).toBeInTheDocument();
  });
});

