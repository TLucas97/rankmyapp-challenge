import { ChartCard } from "@/components/UserProfile/ChartCard";
import { ReposCard } from "@/components/UserProfile/ReposCard";
import { UserCard } from "@/components/UserProfile/UserCard";
import { GHRepo, GHUser } from "@/lib/gh/types";

type UserProfileProps = {
    user: GHUser;
    repos: GHRepo[];
    byLanguageCount: Record<string, number>;
    starsByLanguage: Record<string, number>;
};

export default function UserProfile({
    user,
    repos,
    byLanguageCount,
    starsByLanguage,
}: UserProfileProps) {
    return (
        <div className="max-w-7xl mx-auto h-[calc(100vh-2rem)] lg:h-[calc(100vh-2rem)] min-h-screen lg:min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4 px-4 lg:px-0">
            <div className="flex flex-col gap-4 relative">
                <UserCard user={user} />
                <ChartCard
                    byLanguageCount={byLanguageCount}
                    starsByLanguage={starsByLanguage}
                />
            </div>

            <ReposCard repos={repos} />
        </div>
    );
}
