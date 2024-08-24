import Image from "next/image";
import imageLogoPlaceholder from "@/assets/workifind-logo.svg";
import { Employer } from "@prisma/client";
import Link from "next/link";

interface CompanyInitialListItemProps {
  company: Employer;
}

export default function CompanyInitialListItem({
  company: { slug, companyLogoUrl, companyName, industry },
}: CompanyInitialListItemProps) {
  return (
    <Link href={`/companies/${slug}`}>
      <div className="flex h-[224px] min-w-[250px] flex-col space-y-2 rounded-lg bg-gray-50 p-4 shadow-sm hover:bg-gray-100">
        <Image
          src={companyLogoUrl || imageLogoPlaceholder}
          width={100}
          height={100}
          alt="Company logo"
        />
        <div className="flex flex-col gap-2">
          <h3 className="text-md truncate text-wrap font-semibold">
            {companyName}
          </h3>
          <h4 className="truncate text-wrap text-sm font-light">{industry}</h4>
          <span className="flex w-fit rounded-xl bg-gray-300 px-2">
            <span className="w-full p-1 text-xs font-semibold">8 jobs</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
