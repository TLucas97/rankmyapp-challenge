import { render, screen } from "@testing-library/react";

import { ChartCard } from "@/components/UserProfile/ChartCard";

jest.mock("@/components/UserProfile/ChartCard/LangChart", () => ({
    LangChart: ({ byLanguageCount }: { byLanguageCount: Record<string, number> }) => (
        <div data-testid="lang-chart">Languages: {Object.keys(byLanguageCount || {}).length}</div>
    ),
}));

jest.mock("@/components/UserProfile/ChartCard/StarsChart", () => ({
    StarsChart: ({ starsByLanguage }: { starsByLanguage: Record<string, number> }) => (
        <div data-testid="stars-chart">Stars: {Object.keys(starsByLanguage || {}).length}</div>
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

describe("ChartCard", () => {
    it("should render LangChart and StarsChart", async () => {
        render(
            <ChartCard
                byLanguageCount={mockByLanguageCount}
                starsByLanguage={mockStarsByLanguage}
            />
        );

        expect(await screen.findByTestId("lang-chart")).toBeInTheDocument();
        expect(await screen.findByTestId("stars-chart")).toBeInTheDocument();
    });

    it("should pass byLanguageCount to LangChart", async () => {
        render(
            <ChartCard
                byLanguageCount={mockByLanguageCount}
                starsByLanguage={mockStarsByLanguage}
            />
        );

        expect(await screen.findByTestId("lang-chart")).toHaveTextContent("Languages: 3");
    });

    it("should pass starsByLanguage to StarsChart", async () => {
        render(
            <ChartCard
                byLanguageCount={mockByLanguageCount}
                starsByLanguage={mockStarsByLanguage}
            />
        );

        expect(await screen.findByTestId("stars-chart")).toHaveTextContent("Stars: 3");
    });

    it("should handle empty language counts", async () => {
        render(<ChartCard byLanguageCount={{}} starsByLanguage={{}} />);

        expect(await screen.findByTestId("lang-chart")).toHaveTextContent("Languages: 0");
        expect(await screen.findByTestId("stars-chart")).toHaveTextContent("Stars: 0");
    });
});
