import {
  Banknote,
  Clock,
  Globe2,
  MapPin,
  SquareArrowOutUpRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { getJobSalary, hasJobSalary, type Job } from "@/entities/job";
import { DEFAULT_COMPANY_LOGO } from "@/shared/constants/logo";
import { Badge } from "@/shared/ui/badge";
import { relativeDate } from "@/shared/utils/format-date";

export function JobItem({
  job: {
    slug,
    title,
    employmentType,
    locationType,
    location,
    createdAt,
    minSalary,
    maxSalary,
    employer: { companyName, companyLogoUrl },
  },
}: {
  job: Job;
}) {
  return (
    <article className="flex cursor-pointer gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-200 hover:shadow-card">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-gray-100 bg-gray-50">
        <Image
          src={companyLogoUrl || DEFAULT_COMPANY_LOGO}
          alt={`${companyName} logo`}
          width={48}
          height={48}
          className="h-full w-full object-contain"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-gray-900 lg:text-md">
              {title}
            </h3>
            <p className="truncate text-xs font-medium text-gray-500 lg:text-sm">
              {companyName}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {employmentType && (
              <Badge className="hidden text-xs md:inline-flex">
                {employmentType}
              </Badge>
            )}
            <Link
              href={`/jobs/${slug}`}
              aria-label={`Open ${title} in full page`}
              className="flex text-gray-400 transition-colors hover:text-indigo-600 md:hidden"
            >
              <SquareArrowOutUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500 lg:text-sm">
          {locationType && (
            <span className="flex items-center gap-1">
              <MapPin size={14} className="shrink-0" aria-hidden="true" />
              {locationType}
            </span>
          )}
          {location && (
            <span className="flex min-w-0 items-center gap-1">
              <Globe2 size={14} className="shrink-0" aria-hidden="true" />
              <span className="truncate">{location}</span>
            </span>
          )}
          {hasJobSalary(minSalary, maxSalary) && (
            <span className="flex items-center gap-1">
              <Banknote size={14} className="shrink-0" aria-hidden="true" />
              {getJobSalary(minSalary, maxSalary)}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between gap-2">
          {employmentType && (
            <Badge variant="secondary" className="text-xs md:hidden">
              {employmentType}
            </Badge>
          )}
          {createdAt && (
            <span className="ml-auto flex items-center gap-1 text-xs text-gray-400">
              <Clock size={14} className="shrink-0" aria-hidden="true" />
              {relativeDate(createdAt)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
