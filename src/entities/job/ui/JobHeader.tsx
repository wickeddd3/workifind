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
import { cn } from "@/shared/lib/utils";
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
  // Salary is pulled out of the meta row: it is the single fact that decides
  // whether the rest of the posting gets read.
  const metaItems: { key: string; icon: LucideIcon; label: string }[] = [];
  if (employmentType)
    metaItems.push({
      key: "employmentType",
      icon: Briefcase,
      label: employmentType,
    });
  if (locationType)
    metaItems.push({ key: "locationType", icon: MapPin, label: locationType });
  // "Remote / Remote" reads as a mistake — drop the place when it merely
  // restates the arrangement.
  if (location && location !== locationType)
    metaItems.push({ key: "location", icon: Globe2, label: location });

  const showSalary = hasJobSalary(minSalary, maxSalary);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-start gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border bg-muted md:h-20 md:w-20">
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
            <h1 className="text-xl font-bold text-foreground hover:underline md:text-2xl lg:text-3xl">
              {title}
            </h1>
          </Link>
          <Link href={`/companies/${companySlug}`} className="w-fit">
            <h3 className="text-md font-medium text-muted-foreground transition-colors hover:text-primary hover:underline md:text-lg">
              {companyName}
            </h3>
          </Link>
          {createdAt && (
            <p className="text-xs text-muted-foreground/80 md:text-sm">
              Posted {relativeDate(createdAt)}
            </p>
          )}
        </div>
      </div>

      {showSalary && (
        <div className="flex items-center gap-2.5 rounded-xl border border-border bg-muted/50 px-4 py-3">
          <Banknote
            size={20}
            className="shrink-0 text-muted-foreground"
            aria-hidden="true"
          />
          <div className="flex flex-col">
            <span className="text-2xs font-semibold uppercase tracking-wide text-muted-foreground">
              Salary
            </span>
            <span className="tabular text-md font-bold text-foreground md:text-lg">
              {getJobSalary(minSalary, maxSalary)}
            </span>
          </div>
        </div>
      )}

      {metaItems.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {metaItems.map(({ key, icon: Icon, label }) => (
            <span
              key={key}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1",
                "text-xs font-medium text-secondary-foreground md:text-sm",
              )}
            >
              <Icon size={14} className="shrink-0" aria-hidden="true" />
              {label}
            </span>
          ))}
        </div>
      )}

      {/* The slot owns its own layout wrapper — an async slot component is
          always a truthy element even when it ultimately renders nothing, so
          wrapping it here would leave an empty padded row for signed-out
          visitors. */}
      {optionSlot}
    </div>
  );
}
