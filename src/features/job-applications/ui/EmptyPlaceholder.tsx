import { Briefcase } from "lucide-react";
import Link from "next/link";

import { Button } from "@/shared/ui/button";

export function EmptyPlaceholder({ message }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border bg-muted/60 px-4 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Briefcase size={26} aria-hidden="true" />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold text-foreground">
          {message ?? "No applications yet"}
        </h3>
        <p className="mx-auto max-w-sm text-sm text-muted-foreground">
          Find roles that fit and apply in just a couple of clicks.
        </p>
      </div>
      <Button asChild className="mt-1">
        <Link href="/jobs">Browse jobs</Link>
      </Button>
    </div>
  );
}
