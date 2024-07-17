import JobItem from "@/components/jobs/JobItem";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { JobFilterValues } from "@/lib/validation";
import { Prisma } from "@prisma/client";

interface JobResultsProps {
  filterValues: JobFilterValues;
}

export default async function JobResults({ filterValues }: JobResultsProps) {
  const { q, type, salary, setup } = filterValues;

  const searchString = q
    ?.split(" ")
    .filter((word) => word.length > 0)
    .join(" & ");

  const searchFilter: Prisma.JobWhereInput = searchString
    ? {
        OR: [
          { title: { search: searchString } },
          { companyName: { search: searchString } },
          { type: { search: searchString } },
          { locationType: { search: searchString } },
          { location: { search: searchString } },
        ],
      }
    : {};

  const where: Prisma.JobWhereInput = {
    AND: [
      searchFilter,
      type ? { type } : {},
      // location ? { location } : {},
      setup ? { locationType: setup } : {},
      { approved: true },
    ],
  };

  const jobs = await prisma.job.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  function getLinkUrl(jobId: number): string {
    const searchParams = new URLSearchParams({
      ...(q && { q: q.trim() }),
      ...(type && { type }),
      ...(salary && { salary }),
      ...(setup && { setup }),
      ...(jobId && { jobId: jobId.toString() }),
    });

    return `/jobs?${searchParams.toString()}`;
  }

  return (
    <div className="w-full space-y-4 md:w-2/5">
      {jobs.map((job) => (
        <Link
          href={getLinkUrl(job.id)}
          scroll={false}
          key={job.id}
          className="block"
          passHref
          legacyBehavior
        >
          <JobItem job={job} />
        </Link>
      ))}
    </div>
  );
}
