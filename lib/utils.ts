import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { GHRepo } from "./gh/types";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function aggregateLangStats(repos: GHRepo[]) {
    if (repos.length === 0) {
        return {
            byLanguageCount: {},
            starsByLanguage: {},
        };
    }

    const byLanguageCountMap = new Map<string, number>();
    const starsByLanguageMap = new Map<string, number>();

    for (const repo of repos) {
        const lang = repo.language ?? "Other";
        const stars = repo.stargazers_count ?? 0;

        byLanguageCountMap.set(lang, (byLanguageCountMap.get(lang) ?? 0) + 1);
        starsByLanguageMap.set(lang, (starsByLanguageMap.get(lang) ?? 0) + stars);
    }

    return {
        byLanguageCount: Object.fromEntries(byLanguageCountMap),
        starsByLanguage: Object.fromEntries(starsByLanguageMap),
    };
}
