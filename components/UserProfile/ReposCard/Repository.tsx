import { Star } from "lucide-react";
import { motion } from "motion/react";

import { GHRepo } from "@/lib/gh/types";

type RepositoryProps = {
    repo: GHRepo;
};

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return "today";
    if (diffInDays === 1) return "yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
}

export function Repository({ repo }: RepositoryProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1],
            }}
            layout
            className="border-border hover:bg-accent/50 cursor-pointer border-b p-4 transition-colors last:border-b-0"
            onClick={() => window.open(repo.html_url, "_blank")}
        >
            <div className="mb-2 flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                    <h3 className="mb-1 truncate text-base font-semibold">{repo.name}</h3>
                    {repo.description && (
                        <p className="text-muted-foreground mb-2 line-clamp-2 text-sm">
                            {repo.description}
                        </p>
                    )}
                </div>
            </div>

            <div className="text-muted-foreground flex flex-wrap items-center gap-2 text-xs sm:gap-4">
                {repo.language && (
                    <span className="flex items-center gap-1">
                        <span className="bg-primary size-3 rounded-full" />
                        {repo.language}
                    </span>
                )}
                <span className="flex items-center gap-1">
                    <Star className="size-3" />
                    {repo.stargazers_count}
                </span>
                <span className="w-full sm:ml-auto sm:w-auto">
                    Updated {formatDate(repo.updated_at)}
                </span>
            </div>
        </motion.div>
    );
}
