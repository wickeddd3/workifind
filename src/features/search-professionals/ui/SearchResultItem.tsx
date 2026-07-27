import type { Applicant } from "@prisma/client";
import { BadgeCheck, Mail, MapPin } from "lucide-react";

export function SearchResultItem({
  professional: {
    firstName,
    lastName,
    email,
    location,
    experienced,
    profession,
  },
}: {
  professional: Applicant;
}) {
  const initials =
    `${firstName?.charAt(0) ?? ""}${lastName?.charAt(0) ?? ""}`.toUpperCase();

  return (
    <article className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-border hover:shadow-card">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-sm font-semibold text-white">
        {initials}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-center gap-2">
          <h3 className="min-w-0 truncate text-sm font-semibold text-foreground md:text-md">
            {`${firstName} ${lastName}`}
          </h3>
          {experienced && (
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
              <BadgeCheck size={14} className="shrink-0" aria-hidden="true" />
              Experienced
            </span>
          )}
        </div>
        {profession && (
          <p className="truncate text-xs font-medium text-muted-foreground md:text-sm">
            {profession}
          </p>
        )}
        <div className="flex flex-col gap-1 text-muted-foreground">
          {email && (
            <p className="flex min-w-0 items-center gap-1.5">
              <Mail size={14} className="shrink-0" aria-hidden="true" />
              <span className="min-w-0 truncate text-xs text-muted-foreground md:text-sm">
                {email}
              </span>
            </p>
          )}
          {location && (
            <p className="flex min-w-0 items-center gap-1.5">
              <MapPin size={14} className="shrink-0" aria-hidden="true" />
              <span className="min-w-0 truncate text-xs text-muted-foreground md:text-sm">
                {location}
              </span>
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
