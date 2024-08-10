import Image from "next/image";
import imageLogoPlaceholder from "@/assets/workifind-logo.svg";
import { Employer } from "@prisma/client";

interface CompanyInitialListItemProps {
  company: Employer;
}

export default function CompanyInitialListItem({
  company: { companyLogoUrl, companyName, industry },
}: CompanyInitialListItemProps) {
  return (
    <div className="flex min-w-[250px] flex-col space-y-2 rounded-lg bg-gray-50 p-4 shadow-sm hover:bg-gray-100">
      <Image
        src={companyLogoUrl || imageLogoPlaceholder}
        width={100}
        height={100}
        alt="Company logo"
      />
      <h3 className="text-md font-semibold">{companyName}</h3>
      <h4 className="text-sm font-light">{industry}</h4>
      <span className="flex w-fit rounded-xl bg-gray-300 px-2">
        <span className="w-full p-1 text-xs font-semibold">8 jobs</span>
      </span>
    </div>
  );
}
