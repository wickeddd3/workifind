import { relativeDate } from "@/shared/utils/format-date";
import { getJobSalary, hasJobSalary } from "./../model/salary";
import { Banknote, Briefcase, Globe2, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { Job } from "../model/types";

export function JobHeader({
  job: {
    slug,
    title,
    minSalary,
    maxSalary,
    employmentType,
    locationType,
    location,
    createdAt,
    employer: { slug: companySlug, companyLogoUrl, companyName },
  },
  optionSlot,
}: {
  job: Job;
  optionSlot?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      {companyLogoUrl && (
        <Image
          src={companyLogoUrl}
          alt={`${companyName} logo`}
          width={140}
          height={140}
          className="rounded-xl"
        />
      )}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <Link href={`/jobs/${slug}`}>
            <h1 className="text-xl font-bold text-gray-900 hover:underline md:text-3xl">
              {title}
            </h1>
          </Link>
          <Link href={`/companies/${companySlug}`}>
            <h3 className="text-md font-medium text-gray-500 hover:underline md:text-xl">
              {companyName}
            </h3>
          </Link>
        </div>
        <div className="flex flex-col gap-2 text-muted-foreground">
          {employmentType && (
            <p className="flex items-center gap-1.5 text-sm text-gray-500 md:text-md">
              <Briefcase size={16} className="shrink-0" />
              {employmentType}
            </p>
          )}
          {locationType && (
            <p className="flex items-center gap-1.5 text-sm text-gray-500 md:text-md">
              <MapPin size={16} className="shrink-0" />
              {locationType}
            </p>
          )}
          {location && (
            <p className="flex items-center gap-1.5 text-sm text-gray-500 md:text-md">
              <Globe2 size={16} className="shrink-0" />
              {location}
            </p>
          )}
          {hasJobSalary(minSalary, maxSalary) && (
            <p className="flex items-center gap-1.5 text-sm text-gray-500 md:text-md">
              <Banknote size={16} className="shrink-0" />
              {getJobSalary(minSalary, maxSalary)}
            </p>
          )}
          {createdAt && (
            <p className="flex items-center gap-1.5 text-xs text-gray-500 md:text-sm">
              {relativeDate(createdAt)}
            </p>
          )}
        </div>
        <div className="flex items-center gap-4">{optionSlot}</div>
      </div>
    </div>
  );
}
