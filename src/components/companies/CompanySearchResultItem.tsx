import Image from "next/image";
import { Employer, Job } from "@prisma/client";
import { DEFAULT_COMPANY_LOGO } from "@/constants/logo";

interface CompanySearchResultItemProps {
  company: Employer & { jobs: Job[] };
}

export default function CompanySearchResultItem({
  company: { companyName, companyLogoUrl, industry, location, jobs },
}: CompanySearchResultItemProps) {
  return (
    <article className="flex cursor-pointer items-center space-x-4 rounded-md border border-gray-100 p-2 hover:bg-gray-50">
      <Image
        src={companyLogoUrl || DEFAULT_COMPANY_LOGO}
        width={110}
        height={110}
        alt={companyName}
        className="rounded-lg"
      />
      <div className="flex flex-col">
        <h3 className="text-sm font-semibold text-gray-900 md:text-md">
          {companyName}
        </h3>
        <h4 className="text-xs font-medium text-gray-800 md:text-sm">
          {industry}
        </h4>
        <h5 className="text-xs md:text-sm">{location}</h5>
        <span className="mt-2 flex w-fit rounded-xl bg-gray-100 px-2">
          <span className="w-full p-1 text-xs font-semibold text-gray-800">
            {jobs?.length || 0} jobs
          </span>
        </span>
      </div>
    </article>
  );
}
