export type GHUser = Readonly<{
    login: string;
    avatar_url: string;
    name: string | null;
    bio: string | null;
    followers: number;
    following: number;
    public_repos: number;
    html_url: string;
}>;

export type GHRepo = Readonly<{
    id: number;
    name: string;
    description: string | null;
    stargazers_count: number;
    language: string | null;
    html_url: string;
    updated_at: string;
}>;