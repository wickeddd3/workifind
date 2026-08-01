import Link from "next/link";

import { cn } from "@/shared/lib/utils";

import type { ProfileCompleteness as Completeness } from "../model/completeness";

/**
 * Progress toward a profile employers can actually filter on.
 *
 * Each remaining item links to the section that fills it, so the prompt is one
 * click from being acted on rather than a number to feel bad about.
 */
export function ProfileCompleteness({
  completeness: { percent, missing },
  editHref = "/applicant/profile/edit",
  className,
}: {
  completeness: Completeness;
  editHref?: string;
  className?: string;
}) {
  const done = percent === 100;

  return (
    <section
      className={cn(
        "flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft",
        className,
      )}
      aria-labelledby="profile-completeness-heading"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex flex-col gap-0.5">
          <h2
            id="profile-completeness-heading"
            className="text-sm font-semibold text-foreground"
          >
            Profile completeness
          </h2>
          <p className="text-sm text-muted-foreground">
            {done
              ? "Your profile is complete — employers can find you on every filter."
              : "Profiles with skills and preferences show up in more employer searches."}
          </p>
        </div>
        <span className="tabular text-2xl font-bold leading-none text-foreground">
          {percent}%
        </span>
      </div>

      <div
        className="h-1.5 overflow-hidden rounded-full bg-muted"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Profile completeness"
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500",
            done ? "bg-feature" : "bg-primary",
          )}
          style={{ width: `${percent}%` }}
        />
      </div>

      {missing.length > 0 && (
        <ul className="flex flex-wrap gap-2">
          {missing.map((section) => (
            <li key={section.id}>
              <Link
                href={`${editHref}#${section.id}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-border px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                <span aria-hidden="true">+</span>
                {section.prompt}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
