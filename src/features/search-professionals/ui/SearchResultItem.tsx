import { BadgeCheck, CalendarClock, Lock, MapPin, Wallet } from "lucide-react";
import Image from "next/image";

import type { ProfileVisibility } from "@/entities/applicant";
import { cn } from "@/shared/lib/utils";
import { formatMoneyCompact } from "@/shared/utils/format-money";

import type { ProfessionalSummaryRow } from "../api/professional.service";

/**
 * One professional in the results list.
 *
 * Note what is absent: no email, no phone number. The card used to print the
 * address under the name, which made the directory a mailing list anyone with
 * an employer account could page through. The query behind this selects neither
 * field, so a later edit cannot put one back by accident.
 *
 * What *is* gated comes as one `visibility` object rather than a growing list
 * of booleans, and it is the same tier table the profile page reads — so a
 * rival applicant scanning the list learns no more than one opening a profile
 * would, and a signed-out visitor gets neither the surname nor the face.
 */
export function SearchResultItem({
  professional: {
    firstName,
    lastName,
    avatarUrl,
    location,
    profession,
    experienced,
    availability,
    salaryExpectation,
    preferredEmploymentTypes,
    skills,
    _count,
  },
  isSelected = false,
  visibility,
}: {
  professional: ProfessionalSummaryRow;
  isSelected?: boolean;
  visibility: ProfileVisibility;
}) {
  const initials =
    `${firstName?.charAt(0) ?? ""}${lastName?.charAt(0) ?? ""}`.toUpperCase();
  const hasExperience = experienced === "With experience";
  const roleCount = _count.experiences;

  return (
    <article
      className={cn(
        "flex gap-4 rounded-2xl border bg-card p-4 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card",
        isSelected
          ? "border-primary/60 ring-1 ring-primary/30"
          : "border-border hover:border-primary/40",
      )}
    >
      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-sm font-semibold text-white">
        {visibility.photo && avatarUrl ? (
          <Image
            src={avatarUrl}
            alt=""
            fill
            sizes="48px"
            className="object-cover"
          />
        ) : (
          initials
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="min-w-0 truncate text-sm font-semibold text-foreground md:text-md">
            {`${firstName} ${lastName}`}
          </h3>
          {hasExperience && (
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
              <BadgeCheck size={14} className="shrink-0" aria-hidden="true" />
              Experienced
            </span>
          )}
        </div>

        {profession && (
          <p className="truncate text-xs font-medium text-muted-foreground md:text-sm">
            {profession}
            {roleCount > 0 && (
              <span className="text-muted-foreground">
                {" · "}
                {roleCount} {roleCount === 1 ? "role" : "roles"} listed
              </span>
            )}
          </p>
        )}

        {/* The facts an employer scans for before opening anything: where, when
            they can start, and what they expect to be paid. */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          {location && (
            <span className="flex min-w-0 items-center gap-1.5">
              <MapPin size={13} className="shrink-0" aria-hidden="true" />
              <span className="truncate">{location}</span>
            </span>
          )}
          {availability && (
            <span className="flex items-center gap-1.5">
              <CalendarClock
                size={13}
                className="shrink-0"
                aria-hidden="true"
              />
              Available {availability.toLowerCase()}
            </span>
          )}
          {salaryExpectation > 0 &&
            (visibility.salary ? (
              <span className="tabular flex items-center gap-1.5">
                <Wallet size={13} className="shrink-0" aria-hidden="true" />
                {formatMoneyCompact(salaryExpectation)}
              </span>
            ) : (
              // A lock rather than the blurred bar the profile uses: at this
              // size a blur is indistinguishable from a rendering glitch, and
              // the row is already dense.
              <span className="flex items-center gap-1.5">
                <Lock size={13} className="shrink-0" aria-hidden="true" />
                Salary shared with employers
              </span>
            ))}
        </div>

        {skills.length > 0 && (
          <ul className="mt-0.5 flex flex-wrap gap-1.5">
            {skills.map((skill) => (
              <li
                key={skill.name}
                className="rounded-full border border-border bg-muted/50 px-2 py-0.5 text-2xs font-medium text-muted-foreground"
              >
                {skill.name}
              </li>
            ))}
          </ul>
        )}

        {preferredEmploymentTypes.length > 0 && (
          <p className="truncate text-2xs text-muted-foreground">
            Open to {preferredEmploymentTypes.join(", ")}
          </p>
        )}
      </div>
    </article>
  );
}
