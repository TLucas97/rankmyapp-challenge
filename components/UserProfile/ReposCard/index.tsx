"use client";

import { makeFakeRepo } from "@/lib/gh/fake";
import { GHRepo } from "@/lib/gh/types";
import { Book, Plus } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { Repository } from "./Repository";

type ReposCardProps = {
    repos: GHRepo[];
};

export function ReposCard({ repos: initialRepos }: ReposCardProps) {
    const [repos, setRepos] = useState<GHRepo[]>(initialRepos);

    const handleAddRepo = () => {
        const newRepo = makeFakeRepo();
        setRepos((prev) => [newRepo, ...prev]);
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            const newRepo = makeFakeRepo();
            setRepos((prev) => [newRepo, ...prev]);
        }, 30000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <div className="border border-border bg-card flex flex-col overflow-hidden min-h-[400px] lg:min-h-0 lg:h-full">
            <div className="p-2 border-b border-border flex items-center justify-between">
                <h2 className="text-base sm:text-lg tracking-wide flex items-center gap-2">
                    <Book className="size-4" />
                    Repositories
                </h2>
                <button
                    onClick={handleAddRepo}
                    className="p-1 hover:bg-accent rounded-sm transition-colors"
                    aria-label="Add new repository"
                >
                    <Plus className="size-4" />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto lg:h-full">
                {repos.length > 0 ? (
                    <AnimatePresence mode="popLayout">
                        {repos.map((repo) => (
                            <Repository key={repo.id} repo={repo} />
                        ))}
                    </AnimatePresence>
                ) : (
                    <div className="p-4 text-center text-muted-foreground text-sm">
                        No repositories found
                    </div>
                )}
            </div>
        </div>
    );
}