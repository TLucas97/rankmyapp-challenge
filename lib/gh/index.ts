import { api } from "./api";
import { GHRepo, GHUser } from "./types";

export async function getUser(username: string): Promise<GHUser> {
    const { data, cached } = await api.get<GHUser>(`/users/${username}`, {
        cache: {
            ttl: 10 * 60 * 1000,
        },
    });

    if (process.env.NODE_ENV === "development") {
        console.log(`[getUser] ${username} - cached: ${cached}`);
    }

    return data;
}

export async function getRepos(username: string): Promise<GHRepo[]> {
    const { data, cached } = await api.get<GHRepo[]>(
        `/users/${username}/repos?per_page=100&sort=updated`,
        {
            cache: {
                ttl: 5 * 60 * 1000,
            },
        }
    );

    if (process.env.NODE_ENV === "development") {
        console.log(`[getRepos] ${username} - cached: ${cached}`);
    }

    return data;
}
