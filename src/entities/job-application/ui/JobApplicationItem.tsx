import { BadgeCheck, Briefcase, MapPin } from "lucide-react";

import type { JobApplication } from "@/entities/job";

import { JobApplicationPitch } from "./JobApplicationPitch";

export function JobApplicationItem({
  jobApplication: {
    pitch,
    applicant: { firstName, lastName, experienced, profession, location },
  },
}: {
  jobApplication: JobApplication;
}) {
  const initials =
    `${firstName?.charAt(0) ?? ""}${lastName?.charAt(0) ?? ""}`.toUpperCase();

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-soft transition-all duration-200 hover:border-gray-200 hover:shadow-card">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-sm font-semibold text-white">
          {initials}
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="flex items-center gap-2">
            <h3 className="min-w-0 truncate text-sm font-bold text-gray-900 md:text-md">
              {`${firstName} ${lastName}`}
            </h3>
            {experienced && (
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-semibold text-indigo-700">
                <BadgeCheck size={14} className="shrink-0" aria-hidden="true" />
                Experienced
              </span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500 md:text-sm">
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
