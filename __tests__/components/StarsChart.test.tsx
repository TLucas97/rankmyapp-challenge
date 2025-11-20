import { StarsChart } from '@/components/UserProfile/ChartCard/StarsChart';
import { render, screen } from '@testing-library/react';

jest.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="responsive-container">{children}</div>
  ),
  BarChart: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="bar-chart">{children}</div>
  ),
  Bar: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="bar">{children}</div>
  ),
  Cell: () => <div data-testid="cell" />,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  CartesianGrid: () => <div data-testid="cartesian-grid" />,
  Tooltip: () => <div data-testid="tooltip" />,
}));

describe('StarsChart', () => {
  it('should render chart when data is available', () => {
    const starsByLanguage = {
      TypeScript: 100,
      JavaScript: 50,
      Python: 25,
    };

    render(<StarsChart starsByLanguage={starsByLanguage} />);

    expect(screen.getByText('Stars by language')).toBeInTheDocument();
    expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
    expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
  });

  it('should render "No data available" when starsByLanguage is empty', () => {
    render(<StarsChart starsByLanguage={{}} />);

    expect(screen.getByText('No data available')).toBeInTheDocument();
    expect(screen.queryByTestId('responsive-container')).not.toBeInTheDocument();
  });

  it('should render "No data available" when starsByLanguage is null', () => {
    render(<StarsChart starsByLanguage={null} />);

    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  it('should render "No data available" when starsByLanguage is undefined', () => {
    render(<StarsChart starsByLanguage={undefined} />);

    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  it('should limit to top 6 languages', () => {
    const starsByLanguage = {
      TypeScript: 1000,
      JavaScript: 900,
      Python: 800,
      Java: 700,
      C: 600,
      Cpp: 500,
      Go: 400,
    };

    render(<StarsChart starsByLanguage={starsByLanguage} />);

    expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
    expect(screen.queryByText('No data available')).not.toBeInTheDocument();
  });

  it('should sort languages by stars descending', () => {
    const starsByLanguage = {
      Python: 10,
      TypeScript: 100,
      JavaScript: 50,
    };

    render(<StarsChart starsByLanguage={starsByLanguage} />);

    expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
  });
});

