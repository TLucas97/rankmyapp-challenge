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
        <div className="mx-auto mt-4 grid h-[calc(100vh-2rem)] min-h-screen max-w-7xl grid-cols-1 gap-4 px-4 lg:h-[calc(100vh-2rem)] lg:min-h-0 lg:grid-cols-2 lg:px-0">
            <div className="relative flex flex-col gap-4">
                <UserCard user={user} />
                <ChartCard byLanguageCount={byLanguageCount} starsByLanguage={starsByLanguage} />
            </div>

            <ReposCard repos={repos} />
        </div>
    );
}
