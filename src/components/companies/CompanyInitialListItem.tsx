import Image from "next/image";
import { Employer, Job } from "@prisma/client";
import Link from "next/link";
import { noCompanyLogo } from "@/lib/logo";

interface CompanyInitialListItemProps {
  company: Employer & { jobs: Job[] };
}

export default function CompanyInitialListItem({
  company: { slug, companyLogoUrl, companyName, industry, jobs },
}: CompanyInitialListItemProps) {
  return (
    <Link href={`/companies/${slug}`}>
      <div className="flex h-[200px] min-w-[250px] flex-col space-y-2 rounded-xl bg-gray-50 p-4 shadow-sm hover:bg-gray-100 md:h-[208px]">
        <Image
          src={companyLogoUrl || noCompanyLogo}
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
              {jobs?.length || 0} jobs
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
