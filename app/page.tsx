"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
    const [username, setUsername] = useState("");
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (username.trim()) {
            router.push(`/p/${encodeURIComponent(username.trim())}`);
        }
    };

    return (
        <div className="mt-20 flex items-center justify-center px-2">
            <div className="w-full max-w-2xl">
                <div className="mb-8 text-center">
                    <h1 className="mb-2 text-4xl font-bold">GitHub Profile Search</h1>
                    <p className="text-muted-foreground">
                        Enter a GitHub username to view their profile and repositories
                    </p>
                </div>
                <form onSubmit={handleSearch} className="flex gap-2">
                    <Input
                        type="text"
                        placeholder="Enter GitHub username..."
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        inputSize="lg"
                        className="flex-1"
                    />
                    <Button type="submit" size="lg">
                        <Search className="size-4" />
                        Search
                    </Button>
                </form>
            </div>
        </div>
    );
}
