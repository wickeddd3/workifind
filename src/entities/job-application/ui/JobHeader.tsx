import { getJobSalary, hasJobSalary, type Job } from "@/entities/job";
import { relativeDate } from "@/shared/utils/format-date";
import { Banknote, Briefcase, Globe2, MapPin } from "lucide-react";
import { ReactNode } from "react";

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
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-bold md:text-2xl">{title}</h1>
        </div>
        <div className="flex flex-col gap-2 text-muted-foreground">
          <p className="flex items-center gap-1.5 text-sm text-gray-500 md:text-md">
            <Briefcase size={16} className="shrink-0" />
            {employmentType}
          </p>
          <p className="flex items-center gap-1.5 text-sm text-gray-500 md:text-md">
            <MapPin size={16} className="shrink-0" />
            {locationType}
          </p>
          <p className="flex items-center gap-1.5 text-sm text-gray-500 md:text-md">
            <Globe2 size={16} className="shrink-0" />
            {location}
          </p>
          {hasJobSalary(minSalary, maxSalary) && (
            <p className="flex items-center gap-1.5 text-sm text-gray-500 md:text-md">
              <Banknote size={16} className="shrink-0" />
              {getJobSalary(minSalary, maxSalary)}
            </p>
          )}
          <p className="flex items-center gap-1.5 text-xs text-gray-500 md:text-sm">
            {relativeDate(createdAt)}
          </p>
        </div>
        <div className="flex items-center gap-4">{optionSlot}</div>
      </div>
    </div>
  );
}
