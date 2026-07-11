"use client";

import { useEffect } from "react";
import { Button } from "@/shared/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface the error for observability. Swap console for an error tracker
    // (e.g. Sentry.captureException) once one is wired up.
    console.error(error);
  }, [error]);

  return (
    <main className="m-auto flex h-[70vh] w-full max-w-7xl flex-col items-center justify-center gap-4 px-4 text-center md:h-[80vh]">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="max-w-md text-muted-foreground">
        An unexpected error occurred. You can try again, or head back to the
        homepage.
      </p>
      {error.digest && (
        <p className="text-xs text-muted-foreground">
          Reference: {error.digest}
        </p>
      )}
      <div className="mt-2 flex gap-3">
        <Button onClick={reset}>Try again</Button>
        <Button variant="outline" asChild>
          <a href="/">Go to homepage</a>
        </Button>
      </div>
    </main>
  );
}
