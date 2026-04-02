import Image from "next/image";
import Link from "next/link";
import { DEFAULT_COMPANY_LOGO } from "@/shared/constants/logo";
import { Company } from "../model/types";

export function CompanyCard({
  company: { slug, companyLogoUrl, companyName, industry, jobsCount },
}: {
  company: Company;
}) {
  return (
    <Link href={`/companies/${slug}`}>
      <div className="flex h-[200px] min-w-[250px] flex-col space-y-2 rounded-xl bg-gray-50 p-4 shadow-sm hover:bg-gray-100 md:h-[208px]">
        <Image
          src={companyLogoUrl || DEFAULT_COMPANY_LOGO}
          width={80}
          height={80}
          alt="Company logo"
          className="rounded-xl"
        />
        <div className="flex flex-col gap-2">
          <h3 className="truncate text-wrap text-sm font-semibold text-gray-900 md:text-md">
            {companyName}
          </h3>
          <h4 className="truncate text-wrap text-xs font-normal text-gray-900 md:text-sm">
            {industry}
          </h4>
          <span className="flex w-fit rounded-xl bg-gray-200 px-2">
            <span className="w-full p-1 text-xs font-semibold">
              {jobsCount || 0} jobs
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
