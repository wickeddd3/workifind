import Image from "next/image";
import companyLogoPlaceholder from "@/assets/workifind-logo.svg";
import {
  Banknote,
  Clock,
  Globe2,
  MapPin,
  SquareArrowOutUpRight,
} from "lucide-react";
import Badge from "@/components/Badge";
import { Job } from "@prisma/client";
import { formatMoney, relativeDate } from "@/lib/utils";
import Link from "next/link";

interface JobItemProps {
  job: Job;
}

export default function JobItem({
  job: {
    slug,
    title,
    // companyName,
    employmentType,
    locationType,
    location,
    salary,
    // companyLogoUrl,
    createdAt,
  },
}: JobItemProps) {
  return (
    <article className="flex cursor-pointer gap-3 rounded-lg border p-3 hover:bg-muted/60">
      <div className="flex-grow space-y-3">
        {/* <Image
          src={companyLogoUrl || companyLogoPlaceholder}
          alt={`${companyName} logo`}
          width={100}
          height={70}
          className="rounded-lg"
        /> */}
        <div>
          <h2 className="text-xl font-medium">{title}</h2>
          {/* <p className="text-muted-foreground">{companyName}</p> */}
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
          <p className="flex items-center gap-1.5 text-sm">
            <Banknote size={16} className="shrink-0" />
            {formatMoney(salary)}
          </p>
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
