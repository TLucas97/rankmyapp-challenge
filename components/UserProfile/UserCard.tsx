import { GHUser } from "@/lib/gh/types";
import { Book, UserPlus, Users } from "lucide-react";
import { Button } from "../ui/button";

type UserCardProps = {
    user: GHUser;
};

export function UserCard({ user }: UserCardProps) {
    return (
        <div className="w-full lg:flex-[0.6] border border-border bg-card flex flex-col sm:flex-row">
            <div className="flex-[0.8] border-r-0 sm:border-r border-b sm:border-b-0 border-border relative overflow-hidden flex-shrink-0">
                <img
                    src={user.avatar_url}
                    alt={`${user.login} avatar`}
                    className="w-full h-[250px] sm:h-full sm:min-h-[200px] object-cover"
                />
            </div>
            <div className="absolute top-0 right-0 m-2 flex flex-col sm:flex-row gap-2 z-10">
                <a href={`https://github.com/${user.login}?tab=followers`} target="_blank">
                    <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                        <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        <span className="hidden sm:inline">Followers: </span>{user.followers}
                    </Button>
                </a>
                <a href={`https://github.com/${user.login}?tab=following`} target="_blank">
                    <Button size="sm" className="text-xs sm:text-sm">
                        <UserPlus className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        <span className="hidden sm:inline">Following: </span>{user.following}
                    </Button>
                </a>
            </div>
            <div className="flex-1 flex justify-end items-end flex-col relative min-h-[200px] sm:min-h-0">
                {user.bio && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 italic text-xs sm:text-sm px-2 text-center">
                        {user.bio}
                    </div>
                )}
                <div className="p-2 w-full sm:w-auto mt-auto">
                    <a href={`https://github.com/${user.login}?tab=repositories`} target="_blank">
                        <Button variant="secondary" size="sm" className="w-full sm:w-auto text-xs sm:text-sm">
                            <Book className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                            <span className="hidden sm:inline">Repositories: </span>{user.public_repos}
                        </Button>
                    </a>
                </div>
                <div className="w-full border-t border-border flex items-end justify-end p-2">
                    <h1 className="text-xl sm:text-2xl font-bold">
                        {user.login}
                    </h1>
                </div>
            </div>
        </div>
    );
}