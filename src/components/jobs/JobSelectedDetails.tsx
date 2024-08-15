import { Banknote, Briefcase, Globe2, MapPin } from "lucide-react";
import Image from "next/image";
import companyLogoPlaceholder from "@/assets/workifind-logo.svg";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Markdown from "@/components/Markdown";
import { Employer, Job } from "@prisma/client";
import { formatMoney, relativeDate } from "@/lib/utils";

interface JobSelectedDetailsProps {
  job: Job & { employer: Employer };
}

export default function JobSelectedDetails({
  job: {
    slug,
    title,
    description,
    employmentType,
    locationType,
    location,
    minSalary,
    maxSalary,
    createdAt,
    employer: { companyName, companyLogoUrl },
  },
}: JobSelectedDetailsProps) {
  const salary = () => {
    if (minSalary === maxSalary) {
      return formatMoney(minSalary);
    }
    return `${formatMoney(minSalary)} - ${formatMoney(maxSalary)}`;
  };

  return (
    <section className="w-full grow space-y-5">
      <div className="flex flex-col gap-3">
        {companyName && (
          <Image
            src={companyLogoUrl || companyLogoPlaceholder}
            alt={`${companyName} logo`}
            width={140}
            height={140}
            className="rounded-xl"
          />
        )}
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <Link href={`/jobs/${slug}`}>
              <h1 className="text-3xl font-bold hover:underline">{title}</h1>
            </Link>
            {/* <p className="text-xl font-semibold">
              {applicationUrl ? (
                <Link
                  href={new URL(applicationUrl).origin}
                  className="hover:underline"
                >
                  {companyName}
                </Link>
              ) : (
                <span>{companyName}</span>
              )}
            </p> */}
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
              {`Posted ${relativeDate(createdAt)}`}
            </p>
          </div>
          <div className="flex space-x-4">
            <Button>Apply</Button>
            <Button>Save</Button>
          </div>
        </div>
      </div>
      <div>{description && <Markdown>{description}</Markdown>}</div>
    </section>
  );
}
