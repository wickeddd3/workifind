import { SearchX } from "lucide-react";
import Link from "next/link";

import { Button } from "@/shared/ui/button";

export function EmptyPlaceholder() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border bg-muted/40 px-4 py-12 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <SearchX size={26} aria-hidden="true" />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold text-foreground">No jobs found</h3>
        <p className="mx-auto max-w-sm text-sm text-muted-foreground">
          Nothing matches your search yet. Try broadening your filters or
          clearing them to see more roles.
        </p>
      </div>
      <Button asChild variant="outline" className="mt-1">
        <Link href="/jobs">Clear filters</Link>
      </Button>
    </div>
  );
}
