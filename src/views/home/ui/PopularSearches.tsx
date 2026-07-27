import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

/**
 * Pre-built entry points into the results list.
 *
 * The home page offered one way in — type something into the search box — which
 * assumes the visitor already knows what to call the job they want. Each link
 * below maps to filters the results page actually implements, so none of them
 * can land on an empty set for a reason the user cannot see.
 */
const POPULAR_SEARCHES: { label: string; href: string }[] = [
  { label: "Remote roles", href: "/jobs?locationType=Remote" },
  { label: "Hybrid roles", href: "/jobs?locationType=Hybrid" },
  { label: "Full-time", href: "/jobs?employmentType=Full-time" },
  { label: "Part-time", href: "/jobs?employmentType=Part-time" },
  { label: "Internships", href: "/jobs?employmentType=Internship" },
  { label: "Contract work", href: "/jobs?employmentType=Contract" },
  { label: "$100k and up", href: "/jobs?salary=100000" },
  { label: "Engineering", href: "/jobs?q=Engineer" },
  { label: "Design", href: "/jobs?q=Designer" },
];

export function PopularSearches() {
  return (
    <section className="flex w-full flex-col gap-3 py-2 md:py-4">
      <h2 className="text-md font-semibold text-foreground md:text-lg lg:text-xl">
        Popular searches
      </h2>
      <ul className="flex flex-wrap gap-2">
        {POPULAR_SEARCHES.map(({ label, href }) => (
          <li key={label}>
            <Link
              href={href}
              className="group inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-2 text-xs font-medium text-foreground shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary md:text-sm"
            >
              {label}
              <ArrowUpRight
                size={14}
                className="text-muted-foreground transition-colors group-hover:text-primary"
                aria-hidden="true"
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
