import { Employer, Job } from "@prisma/client";
import Markdown from "@/components/Markdown";
import { Button } from "@/components/ui/button";
import { Banknote, Briefcase, Globe2, MapPin } from "lucide-react";
import Image from "next/image";
import companyLogoPlaceholder from "@/assets/workifind-logo.svg";
import { formatMoney, relativeDate } from "@/lib/utils";

interface JobDetailsProps {
  job: Job & { employer: Employer };
}

export default function JobDetails({
  job: {
    title,
    description,
    employmentType,
    locationType,
    location,
    salaryStart,
    salaryEnd,
    createdAt,
    employer: { companyName, companyLogoUrl },
  },
}: JobDetailsProps) {
  const salary = () => {
    if (salaryStart === salaryEnd) {
      return formatMoney(salaryStart);
    }
    return `${formatMoney(salaryStart)} - ${formatMoney(salaryEnd)}`;
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
            <h1 className="text-3xl font-bold">{title}</h1>
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
              {relativeDate(createdAt)}
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
