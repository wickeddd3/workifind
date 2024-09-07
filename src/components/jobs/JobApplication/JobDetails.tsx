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
    <div className="flex flex-wrap items-center gap-8">
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
        <h6 className="text-sm font-normal text-muted-foreground sm:text-md">
          Applying for
        </h6>
        <h1 className="text-xl font-semibold text-gray-900 sm:text-3xl">
          {title}
        </h1>
        <h1 className="text-md font-normal text-gray-800 sm:text-xl">
          {companyName}
        </h1>
        <Link href={`/jobs/${slug}`}>
          <h6 className="text-sm font-medium underline">
            View job description
          </h6>
        </Link>
      </div>
    </div>
  );
}
