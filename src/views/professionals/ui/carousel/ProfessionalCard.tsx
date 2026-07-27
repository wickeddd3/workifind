import { BadgeCheck, Mail, MapPin } from "lucide-react";
import Link from "next/link";

import type { Applicant } from "@/entities/applicant";

export function ProfessionalCard({
  professional: {
    id,
    firstName,
    lastName,
    profession,
    email,
    location,
    experienced,
  },
}: {
  professional: Applicant;
}) {
  const initials =
    `${firstName?.charAt(0) ?? ""}${lastName?.charAt(0) ?? ""}`.toUpperCase();

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
              {experienced && (
                <span className="flex shrink-0 items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                  <BadgeCheck
                    size={14}
                    className="shrink-0"
                    aria-hidden="true"
                  />
                  Verified
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
          {email && (
            <p className="flex min-w-0 items-center gap-1.5">
              <Mail size={16} className="shrink-0" aria-hidden="true" />
              <span className="min-w-0 truncate text-sm">{email}</span>
            </p>
          )}
          {location && (
            <p className="flex min-w-0 items-center gap-1.5">
              <MapPin size={16} className="shrink-0" aria-hidden="true" />
              <span className="min-w-0 truncate text-sm">{location}</span>
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
