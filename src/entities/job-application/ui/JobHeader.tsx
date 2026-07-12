import {
  Banknote,
  Briefcase,
  Globe2,
  type LucideIcon,
  MapPin,
} from "lucide-react";
import { type ReactNode } from "react";

import { getJobSalary, hasJobSalary, type Job } from "@/entities/job";
import { relativeDate } from "@/shared/utils/format-date";

export function JobHeader({
  job: {
    title,
    minSalary,
    maxSalary,
    employmentType,
    locationType,
    location,
    createdAt,
  },
  optionSlot,
}: {
  job: Job;
  optionSlot?: ReactNode;
}) {
  const metaItems: { key: string; icon: LucideIcon; label: string }[] = [];
  if (employmentType)
    metaItems.push({
      key: "employmentType",
      icon: Briefcase,
      label: employmentType,
    });
  if (locationType)
    metaItems.push({ key: "locationType", icon: MapPin, label: locationType });
  if (location)
    metaItems.push({ key: "location", icon: Globe2, label: location });
  if (hasJobSalary(minSalary, maxSalary))
    metaItems.push({
      key: "salary",
      icon: Banknote,
      label: getJobSalary(minSalary, maxSalary),
    });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold text-gray-900 md:text-2xl">{title}</h1>
        {createdAt && (
          <p className="text-xs text-gray-400 md:text-sm">
            Posted {relativeDate(createdAt)}
          </p>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {metaItems.map(({ key, icon: Icon, label }) => (
          <span
            key={key}
            className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 md:text-sm"
          >
            <Icon size={14} className="shrink-0" aria-hidden="true" />
            {label}
          </span>
        ))}
      </div>
      {optionSlot && (
        <div className="flex flex-wrap items-center gap-3">{optionSlot}</div>
      )}
    </div>
  );
}
