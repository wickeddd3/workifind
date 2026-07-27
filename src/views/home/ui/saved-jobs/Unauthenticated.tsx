import { LogIn } from "lucide-react";
import Link from "next/link";

import { Button } from "@/shared/ui/button";

export function Unauthenticated() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-gray-200 bg-gray-50/60 px-4 py-12 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
        <LogIn size={26} aria-hidden="true" />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold text-gray-900">
          Save jobs for later
        </h3>
        <p className="mx-auto max-w-sm text-sm text-muted-foreground">
          Sign in to bookmark jobs that match your preferences and pick up where
          you left off.
        </p>
      </div>
      <Button asChild className="mt-1">
        <Link href="/sign-in">Sign in</Link>
      </Button>
    </div>
  );
}
