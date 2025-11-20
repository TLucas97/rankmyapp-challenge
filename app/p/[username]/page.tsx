import UserProfile from "@/components/UserProfile";
import { computeLanguageInsights, getRepos, getUser } from "@/lib/gh";
import { Metadata } from "next";
import { redirect } from "next/navigation";

type Params = {
    params: Promise<{ username: string }>;
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const { username } = await params;
    const decodedUsername = decodeURIComponent(username);

    try {
        const user = await getUser(decodedUsername);

        const title = user.name
            ? `${user.name} (@${user.login}) - GitHub Insights`
            : `${user.login} - GitHub Insights`;

        const description = user.bio
            ? `${user.bio} • ${user.followers} followers • ${user.public_repos} public repositories`
            : `GitHub profile of ${user.login}. ${user.followers} followers, ${user.following} following, and ${user.public_repos} public repositories.`;

        return {
            title,
            description,
            openGraph: {
                title,
                description,
                type: "profile",
                images: [
                    {
                        url: user.avatar_url,
                        width: 400,
                        height: 400,
                        alt: `${user.login} avatar`,
                    },
                ],
                url: `https://github.com/${user.login}`,
                siteName: "GitHub Insights",
            },
            twitter: {
                card: "summary",
                title,
                description,
                images: [user.avatar_url],
            },
            alternates: {
                canonical: `https://github.com/${user.login}`,
            },
        };
    } catch (error) {
        return {
            title: `${decodedUsername} - GitHub Insights`,
            description: `GitHub profile insights for ${decodedUsername}`,
        };
    }
}

export default async function UserPage({ params }: Params) {
    const { username } = await params;
    const decodedUsername = decodeURIComponent(username);

    try {
        const [user, repos] = await Promise.all([
            getUser(decodedUsername),
            getRepos(decodedUsername),
        ]);

        const { byLanguageCount, starsByLanguage } = computeLanguageInsights(repos);

        return (
            <UserProfile
                user={user}
                repos={repos}
                byLanguageCount={byLanguageCount}
                starsByLanguage={starsByLanguage}
            />
        );
    } catch (error) {
        redirect("/failed");
    }
}

