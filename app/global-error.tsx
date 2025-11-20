"use client";

import { Button } from "@/components/ui/button";
import * as Sentry from "@sentry/nextjs";
import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="flex items-center justify-center min-h-screen p-4">
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
                Something went wrong!
              </h1>
              <p className="text-muted-foreground">
                An unexpected error occurred. We've been notified and are working on fixing it.
              </p>
            </div>
            <div className="flex gap-2 justify-center">
              <Button onClick={reset} variant="default" size="lg">
                Try again
              </Button>
              <Link href="/">
                <Button variant="outline" size="lg">
                  Back to home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

