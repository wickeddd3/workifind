import type { LucideIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/shared/ui/button";

/**
 * What a list looks like when it has nothing in it.
 *
 * One component rather than a copy per list: the four lists that show this
 * differed only in their icon, their words and where the button went, and
 * keeping four copies is how three of them ended up with a slightly different
 * dashed border.
 */
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  /** The one thing to do about it. Omitted when there is nothing to offer. */
  action?: { label: string; href: string };
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border bg-muted/60 px-4 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Icon size={26} aria-hidden="true" />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="mx-auto max-w-sm text-sm text-muted-foreground">
          {description}
        </p>
      </div>
      {action && (
        <Button asChild className="mt-1">
          <Link href={action.href}>{action.label}</Link>
        </Button>
      )}
    </div>
  );
}
