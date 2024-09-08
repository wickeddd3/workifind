import { Employer, Job } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface JobDetailsProps {
  job: Job & { employer: Employer };
}

export default function JobDetails({
  job: {
    slug,
    title,
    employer: { companyName, companyLogoUrl },
  },
}: JobDetailsProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 md:gap-8">
      {companyLogoUrl && (
        <Image
          src={companyLogoUrl}
          alt={`${companyName} logo`}
          width={140}
          height={140}
          className="rounded-xl"
        />
      )}
      <div className="flex flex-col gap-2">
        <h6 className="text-xs font-normal text-gray-500 md:text-sm lg:text-md">
          Applying for
        </h6>
        <h1 className="text-md font-bold text-gray-900 md:text-xl lg:text-2xl">
          {title}
        </h1>
        <h2 className="text-sm font-semibold text-gray-600 md:text-md lg:text-lg">
          {companyName}
        </h2>
        <Link href={`/jobs/${slug}`}>
          <h6 className="text-xs font-medium underline md:text-sm lg:text-md">
            View job description
          </h6>
        </Link>
      </div>
    </div>
  );
}
