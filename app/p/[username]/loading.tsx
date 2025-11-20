export default function Loading() {
    return (
        <div className="mx-auto mt-4 grid h-[calc(100vh-2rem)] min-h-screen max-w-7xl grid-cols-1 gap-4 px-4 lg:h-[calc(100vh-2rem)] lg:min-h-0 lg:grid-cols-2 lg:px-0">
            <div className="relative flex flex-col gap-4">
                <div className="border-border bg-card flex w-full flex-col border sm:flex-row lg:flex-[0.6]">
                    <div className="border-border relative flex-[0.8] flex-shrink-0 overflow-hidden border-r-0 border-b sm:border-r sm:border-b-0">
                        <div className="bg-muted h-[250px] w-full animate-pulse sm:h-full sm:min-h-[200px]" />
                    </div>
                    <div className="absolute top-0 right-0 z-10 m-2 flex flex-col gap-2 sm:flex-row">
                        <div className="bg-muted border-border h-8 w-20 animate-pulse rounded-none border-2 sm:w-28" />
                        <div className="bg-muted border-border h-8 w-20 animate-pulse rounded-none border-2 sm:w-28" />
                    </div>
                    <div className="relative flex min-h-[200px] flex-1 flex-col items-end justify-end sm:min-h-0">
                        <div className="absolute top-1/2 left-1/2 w-3/4 -translate-x-1/2 -translate-y-1/2">
                            <div className="bg-muted mb-2 h-4 animate-pulse rounded" />
                            <div className="bg-muted mx-auto h-4 w-2/3 animate-pulse rounded" />
                        </div>
                        <div className="mt-auto w-full p-2 sm:w-auto">
                            <div className="bg-muted border-border h-8 w-full animate-pulse rounded-none border-2 sm:w-32" />
                        </div>
                        <div className="border-border flex w-full items-end justify-end border-t p-2">
                            <div className="bg-muted h-7 w-32 animate-pulse rounded" />
                        </div>
                    </div>
                </div>

                <div className="border-border bg-card flex min-h-[400px] flex-1 flex-col border lg:min-h-0">
                    <div className="border-border flex min-h-[200px] flex-1 items-center justify-center border-b">
                        <div className="h-full w-full space-y-3 p-4">
                            <div className="bg-muted h-4 w-24 animate-pulse rounded" />
                            <div className="space-y-2">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <div className="bg-muted h-3 w-3 animate-pulse rounded" />
                                        <div className="bg-muted h-4 flex-1 animate-pulse rounded" />
                                        <div className="bg-muted h-4 w-12 animate-pulse rounded" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex min-h-[200px] flex-1 items-center justify-center">
                        <div className="h-full w-full space-y-3 p-4">
                            <div className="bg-muted h-4 w-24 animate-pulse rounded" />
                            <div className="space-y-2">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <div className="bg-muted h-3 w-3 animate-pulse rounded" />
                                        <div className="bg-muted h-4 flex-1 animate-pulse rounded" />
                                        <div className="bg-muted h-4 w-12 animate-pulse rounded" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-border bg-card flex min-h-[400px] flex-col overflow-hidden border lg:h-full lg:min-h-0">
                <div className="border-border flex items-center justify-between border-b p-2">
                    <div className="bg-muted h-5 w-32 animate-pulse rounded" />
                    <div className="bg-muted h-8 w-8 animate-pulse rounded-sm" />
                </div>
                <div className="flex-1 space-y-2 overflow-y-auto p-2 lg:h-full">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="border-border space-y-2 border p-3">
                            <div className="flex items-center justify-between">
                                <div className="bg-muted h-5 w-40 animate-pulse rounded" />
                                <div className="bg-muted h-4 w-16 animate-pulse rounded" />
                            </div>
                            <div className="bg-muted h-4 w-full animate-pulse rounded" />
                            <div className="bg-muted h-4 w-3/4 animate-pulse rounded" />
                            <div className="mt-2 flex items-center gap-2">
                                <div className="bg-muted h-4 w-16 animate-pulse rounded" />
                                <div className="bg-muted h-4 w-16 animate-pulse rounded" />
                                <div className="bg-muted h-4 w-20 animate-pulse rounded" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
