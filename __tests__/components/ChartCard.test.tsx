import { render, screen } from '@testing-library/react';
import { ChartCard } from '@/components/UserProfile/ChartCard';

jest.mock('@/components/UserProfile/ChartCard/LangChart', () => ({
  LangChart: ({ byLanguageCount }: { byLanguageCount: Record<string, number> }) => (
    <div data-testid="lang-chart">
      Languages: {Object.keys(byLanguageCount || {}).length}
    </div>
  ),
}));

jest.mock('@/components/UserProfile/ChartCard/StarsChart', () => ({
  StarsChart: ({ starsByLanguage }: { starsByLanguage: Record<string, number> }) => (
    <div data-testid="stars-chart">
      Stars: {Object.keys(starsByLanguage || {}).length}
    </div>
  ),
}));

const mockByLanguageCount = {
  TypeScript: 5,
  JavaScript: 3,
  Python: 2,
};

const mockStarsByLanguage = {
  TypeScript: 100,
  JavaScript: 50,
  Python: 25,
};

describe('ChartCard', () => {
  it('should render LangChart and StarsChart', () => {
    render(
      <ChartCard
        byLanguageCount={mockByLanguageCount}
        starsByLanguage={mockStarsByLanguage}
      />
    );

    expect(screen.getByTestId('lang-chart')).toBeInTheDocument();
    expect(screen.getByTestId('stars-chart')).toBeInTheDocument();
  });

  it('should pass byLanguageCount to LangChart', () => {
    render(
      <ChartCard
        byLanguageCount={mockByLanguageCount}
        starsByLanguage={mockStarsByLanguage}
      />
    );

    expect(screen.getByTestId('lang-chart')).toHaveTextContent('Languages: 3');
  });

  it('should pass starsByLanguage to StarsChart', () => {
    render(
      <ChartCard
        byLanguageCount={mockByLanguageCount}
        starsByLanguage={mockStarsByLanguage}
      />
    );

    expect(screen.getByTestId('stars-chart')).toHaveTextContent('Stars: 3');
  });

  it('should handle empty language counts', () => {
    render(
      <ChartCard
        byLanguageCount={{}}
        starsByLanguage={{}}
      />
    );

    expect(screen.getByTestId('lang-chart')).toHaveTextContent('Languages: 0');
    expect(screen.getByTestId('stars-chart')).toHaveTextContent('Stars: 0');
  });
});

