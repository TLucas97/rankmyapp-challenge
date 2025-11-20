import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function FailedPage() {
    return (
        <div className="flex items-center justify-center p-4 mt-10">
            <div className="max-w-md w-full text-center space-y-6">
                <div className="flex justify-center">
                    <img
                        src="https://media.giphy.com/media/3o7aCTPPm4OHfRLSH6/giphy.gif"
                        alt="Error animation"
                        className="w-64 h-64 object-contain"
                    />
                </div>
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold">
                        Oops! Something went wrong
                    </h1>
                    <p className="text-muted-foreground">
                        We couldn't find the user or an error occurred during the search.
                        Please check the username and try again.
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

