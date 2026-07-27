import { Compass } from "lucide-react";
import Link from "next/link";

import { Button } from "@/shared/ui/button";

/**
 * The previous version leaned on a fixed-light background SVG and an
 * off-palette emerald button, and offered one way out. Built from tokens now,
 * and points at the two places a lost visitor actually wants.
 */
export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-7xl items-center justify-center px-4 py-16">
      <section className="flex w-full max-w-md flex-col items-center gap-5 text-center">
        <span
          className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary"
          aria-hidden="true"
        >
          <Compass size={30} />
        </span>
        <div className="flex flex-col gap-2">
          <p className="tabular text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Error 404
          </p>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">
            We couldn&apos;t find that page
          </h1>
          <p className="text-balance text-sm text-muted-foreground md:text-md">
            The link may be out of date, or the role you were looking at may
            have closed.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button asChild>
            <Link href="/jobs">Browse jobs</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Go to homepage</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
