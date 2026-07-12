import Image from "next/image";
import Link from "next/link";

import { type Company } from "@/entities/employer";
import { DEFAULT_COMPANY_LOGO } from "@/shared/constants/logo";

export function CompanyCard({
  company: { slug, companyLogoUrl, companyName, industry, jobsCount },
}: {
  company: Company;
}) {
  return (
    <Link href={`/companies/${slug}`} className="block">
      <div className="flex h-[200px] min-w-[250px] flex-col gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover md:h-[208px]">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
          <Image
            src={companyLogoUrl || DEFAULT_COMPANY_LOGO}
            width={64}
            height={64}
            alt={`${companyName} logo`}
            className="h-full w-full object-contain"
          />
        </div>
        <div className="flex min-w-0 flex-col gap-1.5">
          <h3 className="truncate text-sm font-semibold text-gray-900 md:text-md">
            {companyName}
          </h3>
          <p className="truncate text-xs font-normal text-gray-600 md:text-sm">
            {industry}
          </p>
          <span className="w-fit rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700">
            {jobsCount || 0} jobs
          </span>
        </div>
      </div>
    </Link>
  );
}
