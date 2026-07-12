import { SearchX } from "lucide-react";
import Link from "next/link";

import { Button } from "@/shared/ui/button";

export function EmptyPlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-gray-200 bg-gray-50/60 px-4 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
        <SearchX size={26} aria-hidden="true" />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold text-gray-900">
          No professionals found
        </h3>
        <p className="mx-auto max-w-sm text-sm text-muted-foreground">
          Try a different profession, or browse all professionals to see
          who&apos;s available.
        </p>
      </div>
      <Button asChild variant="outline" className="mt-1">
        <Link href="/professionals">Browse all professionals</Link>
      </Button>
    </div>
  );
}
