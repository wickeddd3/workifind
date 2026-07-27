import { BadgeCheck, Briefcase, MapPin } from "lucide-react";

import type { JobApplicationWithApplicant } from "../model/types";
import { JobApplicationPitch } from "./JobApplicationPitch";

export function ReceivedApplicationItem({
  jobApplication: {
    pitch,
    applicant: { firstName, lastName, experienced, profession, location },
  },
}: {
  jobApplication: JobApplicationWithApplicant;
}) {
  const initials =
    `${firstName?.charAt(0) ?? ""}${lastName?.charAt(0) ?? ""}`.toUpperCase();

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 shadow-soft transition-all duration-200 hover:border-border hover:shadow-card">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-sm font-semibold text-white">
          {initials}
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="flex items-center gap-2">
            <h3 className="min-w-0 truncate text-sm font-bold text-foreground md:text-md">
              {`${firstName} ${lastName}`}
            </h3>
            {experienced && (
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                <BadgeCheck size={14} className="shrink-0" aria-hidden="true" />
                Experienced
              </span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground md:text-sm">
            {profession && (
              <span className="flex items-center gap-1">
                <Briefcase size={14} className="shrink-0" aria-hidden="true" />
                {profession}
              </span>
            )}
            {location && (
              <span className="flex items-center gap-1">
                <MapPin size={14} className="shrink-0" aria-hidden="true" />
                {location}
              </span>
            )}
          </div>
        </div>
      </div>
      <JobApplicationPitch title="Applicant pitch" pitch={pitch} />
    </div>
  );
}
