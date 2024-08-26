import { Employer, Job, JobApplication } from "@prisma/client";
import Markdown from "@/components/Markdown";
import { Banknote, Briefcase, Globe2, MapPin } from "lucide-react";
import Image from "next/image";
import { formatMoney, relativeDate } from "@/lib/utils";
import ApplyButton from "@/components/jobs/ApplyButton";
import SaveJobButton from "@/components/jobs/SaveJobButton";
import Link from "next/link";

interface JobDetailsProps {
  job: Job & { employer: Employer } & { jobApplications: JobApplication[] };
}

export default function JobDetails({
  job: {
    title,
    description,
    employmentType,
    locationType,
    location,
    minSalary,
    maxSalary,
    createdAt,
    employer: { slug: companySlug, companyName, companyLogoUrl },
  },
  job,
}: JobDetailsProps) {
  const salary = () => {
    if (minSalary === maxSalary) {
      return formatMoney(minSalary);
    }
    return `${formatMoney(minSalary)} - ${formatMoney(maxSalary)}`;
  };

  return (
    <section className="w-full grow space-y-5">
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
            <h1 className="text-3xl font-bold">{title}</h1>
            <Link href={`/companies/${companySlug}`}>
              <h3 className="text-xl font-medium text-muted-foreground hover:underline">
                {companyName}
              </h3>
            </Link>
          </div>
          <div className="flex flex-col gap-2 text-muted-foreground">
            <p className="flex items-center gap-1.5">
              <Briefcase size={16} className="shrink-0" />
              {employmentType}
            </p>
            <p className="flex items-center gap-1.5">
              <MapPin size={16} className="shrink-0" />
              {locationType}
            </p>
            <p className="flex items-center gap-1.5">
              <Globe2 size={16} className="shrink-0" />
              {location}
            </p>
            <p className="flex items-center gap-1.5">
              <Banknote size={16} className="shrink-0" />
              {salary()}
            </p>
            <p className="flex items-center gap-1.5 text-sm">
              {relativeDate(createdAt)}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <ApplyButton job={job} />
            <SaveJobButton job={job} />
          </div>
        </div>
      </div>
      <div>{description && <Markdown>{description}</Markdown>}</div>
    </section>
  );
}
