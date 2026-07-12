import {
  Banknote,
  Briefcase,
  Globe2,
  type LucideIcon,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type ReactNode } from "react";

import { DEFAULT_COMPANY_LOGO } from "@/shared/constants/logo";
import { relativeDate } from "@/shared/utils/format-date";

import type { Job } from "../model/types";
import { getJobSalary, hasJobSalary } from "./../model/salary";

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
      <div className="flex items-start gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-gray-50 md:h-20 md:w-20">
          <Image
            src={companyLogoUrl || DEFAULT_COMPANY_LOGO}
            alt={`${companyName} logo`}
            width={80}
            height={80}
            className="h-full w-full object-contain"
          />
        </div>
        <div className="flex min-w-0 flex-col gap-1">
          <Link href={`/jobs/${slug}`} className="w-fit">
            <h1 className="text-xl font-bold text-gray-900 hover:underline md:text-2xl lg:text-3xl">
              {title}
            </h1>
          </Link>
          <Link href={`/companies/${companySlug}`} className="w-fit">
            <h3 className="text-md font-medium text-gray-500 transition-colors hover:text-indigo-600 hover:underline md:text-lg">
              {companyName}
            </h3>
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-2">
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
        {createdAt && (
          <p className="text-xs text-gray-400 md:text-sm">
            Posted {relativeDate(createdAt)}
          </p>
        )}
      </div>

      {optionSlot && (
        <div className="flex flex-wrap items-center gap-3 pt-1">
          {optionSlot}
        </div>
      )}
    </div>
  );
}
