import { ArrowRight, Search, Users } from "lucide-react";
import Link from "next/link";

import { cn } from "@/shared/lib/utils";

/**
 * The two audiences the product serves, each pointing at where that audience
 * starts.
 *
 * Previously a pair of illustrated cards with no link on them — decorative
 * dead ends in the last slot of the page. The artwork was also fixed light
 * (white and near-white fills), so it glared on a dark surface; icon tiles
 * built from tokens carry the same distinction and follow the theme.
 */
const PATHS = [
  {
    href: "/jobs",
    icon: Search,
    title: "Find a role that grows your career",
    body: "Browse openings from companies hiring now and apply in a couple of clicks.",
    cta: "Browse jobs",
    tone: "bg-primary/10 text-primary",
  },
  {
    href: "/employer/jobs/new",
    icon: Users,
    title: "Hire people who truly fit your team",
    body: "Post a role and reach candidates already looking for what you offer.",
    cta: "Post a job",
    tone: "bg-feature-subtle text-feature-subtle-foreground",
  },
];

export function MarketingSection() {
  return (
    <section className="grid w-full grid-cols-1 gap-4 py-2 md:py-4 lg:grid-cols-2">
      {PATHS.map(({ href, icon: Icon, title, body, cta, tone }) => (
        <Link
          key={href}
          href={href}
          className="group flex h-full flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background md:p-6"
        >
          <span
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-xl",
              tone,
            )}
            aria-hidden="true"
          >
            <Icon size={22} />
          </span>
          <h2 className="text-balance text-lg font-bold text-foreground md:text-xl">
            {title}
          </h2>
          <p className="text-sm text-muted-foreground md:text-md">{body}</p>
          <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-primary">
            {cta}
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </span>
        </Link>
      ))}
    </section>
  );
}
