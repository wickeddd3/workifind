"use client";

import { Employer, Job } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { DEFAULT_COMPANY_LOGO } from "@/constants/logo";

interface JobApplicationSubmittedProps {
  job: Job & { employer: Employer };
}

export default function JobApplicationForm({
  job: {
    slug,
    title,
    employer: { companyName, companyLogoUrl },
  },
}: JobApplicationSubmittedProps) {
  return (
    <section className="h-full w-full grow space-y-8">
      <div className="flex flex-wrap items-center gap-8">
        {companyName && (
          <Image
            src={companyLogoUrl || DEFAULT_COMPANY_LOGO}
            alt={`${companyName} logo`}
            width={140}
            height={140}
            className="rounded-xl"
          />
        )}
        <div className="flex flex-col gap-2">
          <h6 className="text-xs font-normal text-gray-500 md:text-sm lg:text-md">
            Applied in
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
      <div className="flex w-full flex-col items-center justify-center gap-8 py-14">
        <Image
          src="/job-submitted.gif"
          width={300}
          height={100}
          alt="Job submitted"
        />
        <h3 className="text-balance text-center text-lg font-semibold text-gray-900 sm:text-xl md:text-2xl lg:text-3xl">
          Job application successfully submitted !
        </h3>
      </div>
    </section>
  );
}
