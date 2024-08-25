"use client";

import { Employer, Job } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { noCompanyLogo } from "@/lib/logo";

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
    <section className="w-full grow space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {companyName && (
          <div className="rounded-xl border-2 border-gray-200">
            <Image
              src={companyLogoUrl || noCompanyLogo}
              alt={`${companyName} logo`}
              width={140}
              height={140}
              className="rounded-xl"
            />
          </div>
        )}
        <div className="flex flex-col gap-2">
          <h6 className="sm:text-md text-sm font-normal text-muted-foreground">
            Applied in
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
      <div className="flex w-full flex-col items-center justify-center gap-8 py-14">
        <Image
          src="/job-submitted.gif"
          width={300}
          height={100}
          alt="Job submitted"
        />
        <h3 className="text-center text-xl font-semibold sm:text-3xl">
          Job application successfully submitted !
        </h3>
      </div>
    </section>
  );
}
