import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function FailedPage() {
    return (
        <div className="mt-10 flex items-center justify-center p-4">
            <div className="w-full max-w-md space-y-6 text-center">
                <div className="flex justify-center">
                    <img
                        src="https://media.giphy.com/media/3o7aCTPPm4OHfRLSH6/giphy.gif"
                        alt="Error animation"
                        className="h-64 w-64 object-contain"
                    />
                </div>
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold">Oops! Something went wrong</h1>
                    <p className="text-muted-foreground">
                        We couldn't find the user or an error occurred during the search. Please
                        check the username and try again.
                    </p>
                </div>
                <Link href="/">
                    <Button variant="default" size="lg">
                        Back to home
                    </Button>
                </Link>
            </div>
        </div>
    );
}
