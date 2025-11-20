import { LangChart } from "./LangChart";
import { StarsChart } from "./StarsChart";

type ChartCardProps = {
    byLanguageCount: Record<string, number>;
    starsByLanguage: Record<string, number>;
};

export function ChartCard({ byLanguageCount, starsByLanguage }: ChartCardProps) {
    return (
        <div className="border-border bg-card flex min-h-[400px] flex-1 flex-col border lg:min-h-0">
            <div className="border-border min-h-[200px] flex-1 border-b">
                <LangChart byLanguageCount={byLanguageCount} />
            </div>
            <div className="min-h-[200px] flex-1">
                <StarsChart starsByLanguage={starsByLanguage} />
            </div>
        </div>
    );
}
