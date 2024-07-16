import { Job } from "@prisma/client";
import Markdown from "@/components/Markdown";
import { Button } from "@/components/ui/button";
import { Banknote, Briefcase, Globe2, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatMoney, relativeDate } from "@/lib/utils";

interface JobDetailsProps {
  job: Job
}

export default function JobDetails({
  job: {
    title,
    description,
    companyName,
    applicationUrl,
    type,
    locationType,
    location,
    salary,
    companyLogoUrl,
    createdAt,
  }
}: JobDetailsProps) {
  return <section className="w-full grow space-y-5">
  <div className="flex flex-col gap-3">
    {companyLogoUrl && (
      <Image
        src={companyLogoUrl}
        alt="Company logo"
        width={140}
        height={140}
        className="rounded-xl"
      />
    )}
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold">
          {title}
        </h1>
        <p className="text-xl font-semibold">
          {applicationUrl ? (
            <Link
              href={new URL(applicationUrl).origin}
              className="text-green-500 hover:underline"
            >
              {companyName}
            </Link>
          ) : (
            <span>{companyName}</span>
          )}
        </p>
      </div>
      <div className="flex flex-col gap-2 text-muted-foreground">
        <p className="flex items-center gap-1.5">
          <Briefcase size={16} className="shrink-0" />
          {type}
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
          {formatMoney(salary)}
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
}