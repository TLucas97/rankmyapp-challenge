import { LangChart } from "./LangChart";
import { StarsChart } from "./StarsChart";

type ChartCardProps = {
  byLanguageCount: Record<string, number>;
  starsByLanguage: Record<string, number>;
};

export function ChartCard({
  byLanguageCount,
  starsByLanguage,
}: ChartCardProps) {
  return (
    <div className="flex-1 border border-border bg-card flex flex-col min-h-[400px] lg:min-h-0">
      <div className="flex-1 border-b border-border min-h-[200px]">
        <LangChart byLanguageCount={byLanguageCount} />
      </div>
      <div className="flex-1 min-h-[200px]">
        <StarsChart starsByLanguage={starsByLanguage} />
      </div>
    </div>
  );
}