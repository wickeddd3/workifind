import { Banknote, Briefcase, Globe2, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Markdown from "@/components/Markdown";
import { Employer, Job, JobApplication } from "@prisma/client";
import { relativeDate } from "@/lib/utils";
import ApplyButton from "@/components/jobs/ApplyButton";
import SaveJobButton from "@/components/jobs/SaveJobButton";
import { getJobSalary, hasJobSalary } from "@/lib/salary";

interface JobSelectedDetailsProps {
  job: Job & { employer: Employer } & { jobApplications: JobApplication[] };
}

export default function JobSelectedDetails({
  job: {
    slug,
    title,
    description,
    employmentType,
    locationType,
    location,
    createdAt,
    employer: { slug: companySlug, companyName, companyLogoUrl },
  },
  job,
}: JobSelectedDetailsProps) {
  return (
    <section className="w-full grow space-y-5 px-4">
      <div className="flex flex-col gap-3">
        {companyLogoUrl && (
          <Image
            src={companyLogoUrl}
            alt={`${companyName} logo`}
            width={140}
            height={140}
            className="rounded-xl"
          />
        )}
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <Link href={`/jobs/${slug}`}>
              <h1 className="text-xl font-bold text-gray-900 hover:underline md:text-2xl lg:text-3xl">
                {title}
              </h1>
            </Link>
            <Link href={`/companies/${companySlug}`}>
              <h3 className="text-sm font-medium text-gray-500 hover:underline md:text-md lg:text-xl">
                {companyName}
              </h3>
            </Link>
          </div>
          <div className="flex flex-col gap-2 text-muted-foreground">
            {employmentType && (
              <p className="flex items-center gap-1.5 text-sm text-gray-500 lg:text-md">
                <Briefcase size={16} className="shrink-0" />
                {employmentType}
              </p>
            )}
            {locationType && (
              <p className="flex items-center gap-1.5 text-sm text-gray-500 lg:text-md">
                <MapPin size={16} className="shrink-0" />
                {locationType}
              </p>
            )}
            {location && (
              <p className="flex items-center gap-1.5 text-sm text-gray-500 lg:text-md">
                <Globe2 size={16} className="shrink-0" />
                {location}
              </p>
            )}
            {hasJobSalary(job) && (
              <p className="flex items-center gap-1.5 text-sm text-gray-500 lg:text-md">
                <Banknote size={16} className="shrink-0" />
                {getJobSalary(job)}
              </p>
            )}
            {createdAt && (
              <p className="flex items-center gap-1.5 text-xs text-gray-500 lg:text-sm">
                {`Posted ${relativeDate(createdAt)}`}
              </p>
            )}
          </div>
          <div className="flex items-center gap-4">
            <ApplyButton job={job} />
            <SaveJobButton job={job} />
          </div>
        </div>
      </div>
      <div className="text-sm lg:text-md">
        {description && <Markdown>{description}</Markdown>}
      </div>
    </section>
  );
}
