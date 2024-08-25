import Image from "next/image";
import { Employer } from "@prisma/client";
import { noCompanyLogo } from "@/lib/logo";

interface CompanySearchResultItemProps {
  company: Employer;
}

export default function CompanySearchResultItem({
  company: { companyName, companyLogoUrl, industry, location },
}: CompanySearchResultItemProps) {
  return (
    <article className="flex cursor-pointer items-center space-x-4 rounded-md border-2 border-gray-100 p-2 hover:bg-gray-50">
      <Image
        src={companyLogoUrl || noCompanyLogo}
        width={120}
        height={100}
        alt={companyName}
      />
      <div className="flex flex-col">
        <h3 className="text-md font-medium text-gray-900">{companyName}</h3>
        <h4 className="text-sm text-gray-700">{industry}</h4>
        <h5 className="text-sm">{location}</h5>
        <span className="mt-2 flex w-fit rounded-xl bg-gray-300 px-2">
          <span className="w-full p-1 text-xs font-semibold">8 jobs</span>
        </span>
      </div>
    </article>
  );
}
