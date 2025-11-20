"use client";

import { Star } from "lucide-react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

type StarsChartProps = {
    starsByLanguage?: Record<string, number> | null;
};

const COLORS = [
    "var(--color-primary)",
    "var(--color-chart-1)",
    "var(--color-chart-2)",
    "var(--color-chart-3)",
    "var(--color-chart-4)",
    "var(--color-chart-5)",
];

export function StarsChart({ starsByLanguage }: StarsChartProps) {
    const data = starsByLanguage
        ? Object.entries(starsByLanguage)
              .map(([lang, stars]) => ({ lang, stars }))
              .sort((a, b) => b.stars - a.stars)
              .slice(0, 6)
        : [];

    const hasData = data.length > 0;

    return (
        <div className="flex h-full flex-col">
            <div className="flex items-center justify-end gap-2 p-2">
                <h3 className="flex items-center gap-2 text-sm tracking-wide">
                    <Star className="size-4" />
                    Stars by language
                </h3>
            </div>
            <div className="min-h-0 flex-1">
                {hasData ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={data}
                            margin={{ top: 10, right: 10, left: -10, bottom: 30 }}
                            barCategoryGap="20%"
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                            <XAxis
                                dataKey="lang"
                                tick={{ fill: "var(--color-muted-foreground)", fontSize: 10 }}
                                stroke="var(--color-border)"
                                angle={-45}
                                textAnchor="end"
                                height={60}
                            />
                            <YAxis
                                tick={{ fill: "var(--color-muted-foreground)", fontSize: 10 }}
                                stroke="var(--color-border)"
                                width={40}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "var(--color-card)",
                                    border: "2px solid var(--color-border)",
                                    borderRadius: "0",
                                }}
                            />
                            <Bar dataKey="stars" radius={[0, 0, 0, 0]}>
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="text-muted-foreground flex h-full items-center justify-center text-sm">
                        No data available
                    </div>
                )}
            </div>
        </div>
    );
}
