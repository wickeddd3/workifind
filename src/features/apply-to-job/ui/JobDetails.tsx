import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { Job } from "@/entities/job";
import { DEFAULT_COMPANY_LOGO } from "@/shared/constants/logo";

export function JobDetails({
  job: {
    slug,
    title,
    employer: { companyName, companyLogoUrl },
  },
}: {
  job: Job;
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-gray-50 md:h-20 md:w-20">
        <Image
          src={companyLogoUrl || DEFAULT_COMPANY_LOGO}
          alt={`${companyName} logo`}
          width={80}
          height={80}
          className="h-full w-full object-contain"
        />
      </div>
      <div className="flex min-w-0 flex-col gap-0.5">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          Applying for
        </p>
        <h1 className="truncate text-lg font-bold text-gray-900 md:text-xl lg:text-2xl">
          {title}
        </h1>
        <p className="truncate text-sm font-medium text-gray-500 md:text-md">
          {companyName}
        </p>
        <Link
          href={`/jobs/${slug}`}
          className="mt-1 inline-flex w-fit items-center gap-1 text-xs font-medium text-indigo-600 transition-colors hover:text-indigo-700 md:text-sm"
        >
          View job description
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
