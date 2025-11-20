import { Book, UserPlus, Users } from "lucide-react";

import { GHUser } from "@/lib/gh/types";
import { Button } from "../ui/button";

type UserCardProps = {
    user: GHUser;
};

export function UserCard({ user }: UserCardProps) {
    return (
        <div className="border-border bg-card flex w-full flex-col border sm:flex-row lg:flex-[0.6]">
            <div className="border-border relative flex-[0.8] shrink-0 overflow-hidden border-r-0 border-b sm:border-r sm:border-b-0">
                <img
                    src={user.avatar_url}
                    alt={`${user.login} avatar`}
                    className="h-[250px] w-full object-cover sm:h-full sm:min-h-[200px]"
                />
            </div>
            <div className="absolute top-0 right-0 z-10 m-2 flex flex-col gap-2 sm:flex-row">
                <a href={`https://github.com/${user.login}?tab=followers`} target="_blank">
                    <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                        <Users className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="hidden sm:inline">Followers: </span>
                        {user.followers}
                    </Button>
                </a>
                <a href={`https://github.com/${user.login}?tab=following`} target="_blank">
                    <Button size="sm" className="text-xs sm:text-sm">
                        <UserPlus className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="hidden sm:inline">Following: </span>
                        {user.following}
                    </Button>
                </a>
            </div>
            <div className="relative flex min-h-[200px] flex-1 flex-col items-end justify-end sm:min-h-0">
                {user.bio && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 text-center text-xs italic sm:text-sm">
                        {user.bio}
                    </div>
                )}
                <div className="mt-auto w-full p-2 sm:w-auto">
                    <a href={`https://github.com/${user.login}?tab=repositories`} target="_blank">
                        <Button
                            variant="secondary"
                            size="sm"
                            className="w-full text-xs sm:w-auto sm:text-sm"
                        >
                            <Book className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                            <span className="hidden sm:inline">Repositories: </span>
                            {user.public_repos}
                        </Button>
                    </a>
                </div>
                <div className="border-border flex w-full items-end justify-end border-t p-2">
                    <h1 className="text-xl font-bold sm:text-2xl">{user.login}</h1>
                </div>
            </div>
        </div>
    );
}
