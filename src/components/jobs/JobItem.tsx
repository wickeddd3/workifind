import Image from "next/image";
import {
  Banknote,
  Clock,
  Globe2,
  MapPin,
  SquareArrowOutUpRight,
} from "lucide-react";
import Badge from "@/components/Badge";
import { Employer, Job } from "@prisma/client";
import { relativeDate } from "@/lib/utils";
import Link from "next/link";
import { getJobSalary, hasJobSalary } from "@/lib/salary";

interface JobItemProps {
  job: Job & { employer: Employer };
}

export default function JobItem({
  job: {
    slug,
    title,
    employmentType,
    locationType,
    location,
    createdAt,
    employer: { companyName, companyLogoUrl },
  },
  job,
}: JobItemProps) {
  return (
    <article className="flex cursor-pointer gap-3 rounded-lg border p-3 hover:bg-muted/60">
      <div className="flex-grow space-y-3">
        {companyLogoUrl && (
          <Image
            src={companyLogoUrl}
            alt={`${companyName} logo`}
            width={100}
            height={70}
            className="rounded-lg"
          />
        )}
        <div>
          <h2 className="text-md font-medium">{title}</h2>
          <p className="text-muted-foreground">{companyName}</p>
        </div>
        <div className="flex flex-col gap-1 text-muted-foreground">
          <p className="flex items-center gap-1.5 text-sm">
            <MapPin size={16} className="shrink-0" />
            {locationType}
          </p>
          <p className="flex items-center gap-1.5 text-sm">
            <Globe2 size={16} className="shrink-0" />
            {location}
          </p>
          {hasJobSalary(job) && (
            <p className="flex items-center gap-1.5">
              <Banknote size={16} className="shrink-0" />
              {getJobSalary(job)}
            </p>
          )}
          <div className="flex justify-between pt-2 sm:hidden">
            <Badge>{employmentType}</Badge>
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Clock size={16} />
              {relativeDate(createdAt)}
            </span>
          </div>
        </div>
      </div>
      <div className="hidden shrink-0 flex-col items-end justify-between sm:flex">
        <Badge>{employmentType}</Badge>
        <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Clock size={16} />
          {relativeDate(createdAt)}
        </span>
      </div>
      <div className="flex shrink-0 sm:hidden">
        <Link href={`/jobs/${slug}`}>
          <span>
            <SquareArrowOutUpRight size={16} />
          </span>
        </Link>
      </div>
    </article>
  );
}
