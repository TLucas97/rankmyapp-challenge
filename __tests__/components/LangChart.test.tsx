import { LangChart } from '@/components/UserProfile/ChartCard/LangChart';
import { render, screen } from '@testing-library/react';

jest.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="responsive-container">{children}</div>
  ),
  AreaChart: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="area-chart">{children}</div>
  ),
  Area: () => <div data-testid="area" />,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  CartesianGrid: () => <div data-testid="cartesian-grid" />,
  Tooltip: () => <div data-testid="tooltip" />,
}));

describe('LangChart', () => {
  it('should render chart when data is available', () => {
    const byLanguageCount = {
      TypeScript: 5,
      JavaScript: 3,
      Python: 2,
    };

    render(<LangChart byLanguageCount={byLanguageCount} />);

    expect(screen.getByText('Most used languages')).toBeInTheDocument();
    expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
    expect(screen.getByTestId('area-chart')).toBeInTheDocument();
  });

  it('should render "No data available" when byLanguageCount is empty', () => {
    render(<LangChart byLanguageCount={{}} />);

    expect(screen.getByText('No data available')).toBeInTheDocument();
    expect(screen.queryByTestId('responsive-container')).not.toBeInTheDocument();
  });

  it('should render "No data available" when byLanguageCount is null', () => {
    render(<LangChart byLanguageCount={null} />);

    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  it('should render "No data available" when byLanguageCount is undefined', () => {
    render(<LangChart byLanguageCount={undefined} />);

    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  it('should limit to top 8 languages', () => {
    const byLanguageCount = {
      TypeScript: 10,
      JavaScript: 9,
      Python: 8,
      Java: 7,
      C: 6,
      Cpp: 5,
      Go: 4,
      Rust: 3,
      Ruby: 2,
      PHP: 1,
    };

    render(<LangChart byLanguageCount={byLanguageCount} />);

    expect(screen.getByTestId('area-chart')).toBeInTheDocument();
    expect(screen.queryByText('No data available')).not.toBeInTheDocument();
  });

  it('should sort languages by count descending', () => {
    const byLanguageCount = {
      Python: 1,
      TypeScript: 5,
      JavaScript: 3,
    };

    render(<LangChart byLanguageCount={byLanguageCount} />);

    expect(screen.getByTestId('area-chart')).toBeInTheDocument();
  });
});

