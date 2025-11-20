"use client";

import { useEffect, useState } from "react";
import { Book, Plus } from "lucide-react";
import { AnimatePresence } from "motion/react";

import { makeFakeRepo } from "@/lib/gh/fake";
import { GHRepo } from "@/lib/gh/types";
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
        <div className="border-border bg-card flex min-h-[400px] flex-col overflow-hidden border lg:h-full lg:min-h-0">
            <div className="border-border flex items-center justify-between border-b p-2">
                <h2 className="flex items-center gap-2 text-base tracking-wide sm:text-lg">
                    <Book className="size-4" />
                    Repositories
                </h2>
                <button
                    onClick={handleAddRepo}
                    className="hover:bg-accent rounded-sm p-1 transition-colors"
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
                    <div className="text-muted-foreground p-4 text-center text-sm">
                        No repositories found
                    </div>
                )}
            </div>
        </div>
    );
}
