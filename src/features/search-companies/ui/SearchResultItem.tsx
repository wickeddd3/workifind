import Image from "next/image";

import { type Company } from "@/entities/employer";
import { DEFAULT_COMPANY_LOGO } from "@/shared/constants/logo";

export function SearchResultItem({
  company: { companyName, companyLogoUrl, industry, location, jobsCount },
}: {
  company: Company;
}) {
  return (
    <article className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-200 hover:shadow-card">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
        <Image
          src={companyLogoUrl || DEFAULT_COMPANY_LOGO}
          width={56}
          height={56}
          alt={`${companyName} logo`}
          className="h-full w-full object-contain"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <h3 className="truncate text-sm font-semibold text-gray-900 md:text-md">
          {companyName}
        </h3>
        {industry && (
          <p className="truncate text-xs font-medium text-gray-500 md:text-sm">
            {industry}
          </p>
        )}
        {location && (
          <p className="truncate text-xs text-gray-400 md:text-sm">
            {location}
          </p>
        )}
      </div>
      <span className="shrink-0 rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700">
        {jobsCount || 0} jobs
      </span>
    </article>
  );
}
