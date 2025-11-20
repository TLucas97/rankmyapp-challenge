"use client";

import { Code2 } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type LangChartProps = {
    byLanguageCount?: Record<string, number> | null;
};

export function LangChart({ byLanguageCount }: LangChartProps) {
    const data = byLanguageCount
        ? Object.entries(byLanguageCount)
            .map(([lang, count]) => ({ lang, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 8)
        : [];

    const hasData = data.length > 0;

    return (
        <div className="h-full flex flex-col">
            <div className="flex items-center justify-end gap-2 p-2">
                <h3 className="text-sm tracking-wide flex items-center gap-2">
                    <Code2 className="size-4" />
                    Most used languages
                </h3>
            </div>
            <div className="flex-1 min-h-0">
                {hasData ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={data}
                            margin={{ top: 10, right: 10, left: -10, bottom: 30 }}
                        >
                            <defs>
                                <linearGradient id="colorLang" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                            <XAxis
                                dataKey="lang"
                                tick={{ fill: 'var(--color-muted-foreground)', fontSize: 10 }}
                                stroke="var(--color-border)"
                                angle={-45}
                                textAnchor="end"
                                height={60}
                            />
                            <YAxis
                                tick={{ fill: 'var(--color-muted-foreground)', fontSize: 10 }}
                                stroke="var(--color-border)"
                                width={40}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'var(--color-card)',
                                    border: '2px solid var(--color-border)',
                                    borderRadius: '0',
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="count"
                                stroke="var(--color-primary)"
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#colorLang)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
                        No data available
                    </div>
                )}
            </div>
        </div>
    );
}

