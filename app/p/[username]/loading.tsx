export default function Loading() {
    return (
        <div className="max-w-7xl mx-auto h-[calc(100vh-2rem)] lg:h-[calc(100vh-2rem)] min-h-screen lg:min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4 px-4 lg:px-0">
            <div className="flex flex-col gap-4 relative">
                <div className="w-full lg:flex-[0.6] border border-border bg-card flex flex-col sm:flex-row">
                    <div className="flex-[0.8] border-r-0 sm:border-r border-b sm:border-b-0 border-border relative overflow-hidden flex-shrink-0">
                        <div className="w-full h-[250px] sm:h-full sm:min-h-[200px] bg-muted animate-pulse" />
                    </div>
                    <div className="absolute top-0 right-0 m-2 flex flex-col sm:flex-row gap-2 z-10">
                        <div className="h-8 w-20 sm:w-28 bg-muted rounded-none border-2 border-border animate-pulse" />
                        <div className="h-8 w-20 sm:w-28 bg-muted rounded-none border-2 border-border animate-pulse" />
                    </div>
                    <div className="flex-1 flex justify-end items-end flex-col relative min-h-[200px] sm:min-h-0">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4">
                            <div className="h-4 bg-muted rounded mb-2 animate-pulse" />
                            <div className="h-4 bg-muted rounded w-2/3 mx-auto animate-pulse" />
                        </div>
                        <div className="p-2 w-full sm:w-auto mt-auto">
                            <div className="h-8 w-full sm:w-32 bg-muted rounded-none border-2 border-border animate-pulse" />
                        </div>
                        <div className="w-full border-t border-border flex items-end justify-end p-2">
                            <div className="h-7 w-32 bg-muted rounded animate-pulse" />
                        </div>
                    </div>
                </div>

                <div className="flex-1 border border-border bg-card flex flex-col min-h-[400px] lg:min-h-0">
                    <div className="flex-1 border-b border-border min-h-[200px] flex items-center justify-center">
                        <div className="w-full h-full p-4 space-y-3">
                            <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                            <div className="space-y-2">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <div className="h-3 w-3 bg-muted rounded animate-pulse" />
                                        <div className="h-4 flex-1 bg-muted rounded animate-pulse" />
                                        <div className="h-4 w-12 bg-muted rounded animate-pulse" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 min-h-[200px] flex items-center justify-center">
                        <div className="w-full h-full p-4 space-y-3">
                            <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                            <div className="space-y-2">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <div className="h-3 w-3 bg-muted rounded animate-pulse" />
                                        <div className="h-4 flex-1 bg-muted rounded animate-pulse" />
                                        <div className="h-4 w-12 bg-muted rounded animate-pulse" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border border-border bg-card flex flex-col overflow-hidden min-h-[400px] lg:min-h-0 lg:h-full">
                <div className="p-2 border-b border-border flex items-center justify-between">
                    <div className="h-5 w-32 bg-muted rounded animate-pulse" />
                    <div className="h-8 w-8 bg-muted rounded-sm animate-pulse" />
                </div>
                <div className="flex-1 overflow-y-auto lg:h-full p-2 space-y-2">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div
                            key={i}
                            className="border border-border p-3 space-y-2"
                        >
                            <div className="flex items-center justify-between">
                                <div className="h-5 w-40 bg-muted rounded animate-pulse" />
                                <div className="h-4 w-16 bg-muted rounded animate-pulse" />
                            </div>
                            <div className="h-4 w-full bg-muted rounded animate-pulse" />
                            <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
                            <div className="flex items-center gap-2 mt-2">
                                <div className="h-4 w-16 bg-muted rounded animate-pulse" />
                                <div className="h-4 w-16 bg-muted rounded animate-pulse" />
                                <div className="h-4 w-20 bg-muted rounded animate-pulse" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

