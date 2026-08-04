import { BadgeCheck, CalendarClock, MapPin } from "lucide-react";
import Link from "next/link";

import type { ApplicantSummary } from "@/entities/applicant/queries";

/**
 * One card in the "explore professionals" carousel.
 *
 * Takes the narrow summary rather than the record: this renders inside a
 * `"use client"` carousel, so anything on the object it is handed is serialized
 * into the page. It used to print the email address, which — now the directory
 * is public — would have published one for every recent candidate.
 */
export function ProfessionalCard({
  professional: {
    id,
    firstName,
    lastName,
    profession,
    location,
    availability,
    experienced,
  },
}: {
  professional: ApplicantSummary;
}) {
  const initials =
    `${firstName?.charAt(0) ?? ""}${lastName?.charAt(0) ?? ""}`.toUpperCase();
  // The badge used to test the column for truthiness, which is set either way —
  // "No experience" is a value, so every card claimed to be verified.
  const hasExperience = experienced === "With experience";

  return (
    <Link href={`/professionals/${id}`} className="block">
      <div className="flex h-[130px] min-w-[240px] flex-col gap-2 rounded-xl border border-border bg-card p-4 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-sm font-semibold text-white">
            {initials}
          </div>
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex items-center gap-2">
              <h3 className="min-w-0 truncate text-md font-semibold text-foreground">
                {`${firstName} ${lastName}`}
              </h3>
              {hasExperience && (
                <span className="flex shrink-0 items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                  <BadgeCheck
                    size={14}
                    className="shrink-0"
                    aria-hidden="true"
                  />
                  Experienced
                </span>
              )}
            </div>
            {profession && (
              <p className="truncate text-sm text-muted-foreground">
                {profession}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1 text-muted-foreground">
          {location && (
            <p className="flex min-w-0 items-center gap-1.5">
              <MapPin size={16} className="shrink-0" aria-hidden="true" />
              <span className="min-w-0 truncate text-sm">{location}</span>
            </p>
          )}
          {availability && (
            <p className="flex min-w-0 items-center gap-1.5">
              <CalendarClock
                size={16}
                className="shrink-0"
                aria-hidden="true"
              />
              <span className="min-w-0 truncate text-sm">
                Available {availability.toLowerCase()}
              </span>
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
