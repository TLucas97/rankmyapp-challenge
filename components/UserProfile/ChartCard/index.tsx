"use client";

import { lazy, Suspense } from "react";

const LangChart = lazy(() => import("./LangChart").then((mod) => ({ default: mod.LangChart })));
const StarsChart = lazy(() => import("./StarsChart").then((mod) => ({ default: mod.StarsChart })));

type ChartCardProps = {
    byLanguageCount: Record<string, number>;
    starsByLanguage: Record<string, number>;
};

function ChartSkeleton() {
    return (
        <div className="flex h-full items-center justify-center">
            <div className="text-muted-foreground text-sm">Loading chart...</div>
        </div>
    );
}

export function ChartCard({ byLanguageCount, starsByLanguage }: ChartCardProps) {
    return (
        <div className="border-border bg-card flex min-h-[400px] flex-1 flex-col border lg:min-h-0">
            <div className="border-border min-h-[200px] flex-1 border-b">
                <Suspense fallback={<ChartSkeleton />}>
                    <LangChart byLanguageCount={byLanguageCount} />
                </Suspense>
            </div>
            <div className="min-h-[200px] flex-1">
                <Suspense fallback={<ChartSkeleton />}>
                    <StarsChart starsByLanguage={starsByLanguage} />
                </Suspense>
            </div>
        </div>
    );
}
