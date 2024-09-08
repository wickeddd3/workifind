import JobItem from "@/components/jobs/JobItem";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { JobFilterValues } from "@/lib/validation";
import { Prisma } from "@prisma/client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface JobResultsProps {
  filterValues: JobFilterValues;
  page?: number;
  jobSlug?: string;
}

export default async function JobResults({
  filterValues,
  page = 1,
  jobSlug,
}: JobResultsProps) {
  const { q, employmentType, salary, locationType } = filterValues;

  const jobsPerPage = 10;
  const skip = (page - 1) * jobsPerPage;

  const searchString = q
    ?.split(" ")
    .filter((word) => word.length > 0)
    .join(" & ");

  const searchFilter: Prisma.JobWhereInput = searchString
    ? {
        OR: [
          { title: { search: searchString } },
          { location: { search: searchString } },
        ],
      }
    : {};

  const salaryInt = parseInt(salary || "");

  const salaryFilter: Prisma.JobWhereInput = salaryInt
    ? {
        OR: [
          {
            minSalary: {
              lte: salaryInt, // Find jobs where minSalary is less than or equal to the input salary
            },
            maxSalary: {
              gte: salaryInt, // And maxSalary is greater than or equal to the input salary
            },
          },
          {
            minSalary: 0, // Handle cases where minSalary is not set (optional)
            maxSalary: {
              gte: salaryInt, // maxSalary is greater than or equal to the input salary
            },
          },
          {
            minSalary: {
              lte: salaryInt, // Find jobs where minSalary is less than or equal to the input salary
            },
            maxSalary: 0, // Handle cases where maxSalary is not set (optional)
          },
        ],
      }
    : {};

  const where: Prisma.JobWhereInput = {
    AND: [
      searchFilter,
      salaryFilter,
      employmentType ? { employmentType } : {},
      locationType ? { locationType } : {},
      { approved: true },
    ],
  };

  const jobsPromise = await prisma.job.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      employer: true,
    },
    take: jobsPerPage,
    skip,
  });

  const countPromise = prisma.job.count({ where });

  const [jobs, totalResults] = await Promise.all([jobsPromise, countPromise]);

  function getLinkUrl(jobSlug: string): string {
    const searchParams = new URLSearchParams({
      ...(q && { q: q.trim() }),
      ...(employmentType && { employmentType }),
      ...(salary && { salary }),
      ...(locationType && { locationType }),
      ...(jobSlug && { job: jobSlug }),
      ...(page && { page: page.toString() }),
    });

    return `/jobs?${searchParams.toString()}`;
  }

  return (
    <div className="w-full space-y-4 py-2 md:w-2/5">
      {jobs.map((job) => (
        <Link
          href={getLinkUrl(job.slug)}
          scroll={false}
          key={job.id}
          className="block"
          passHref
          legacyBehavior
        >
          <JobItem job={job} />
        </Link>
      ))}
      {jobs.length === 0 && (
        <p className="m-auto text-center">
          No jobs found. Try adjusting your search filters.
        </p>
      )}
      {jobs.length > 0 && (
        <Pagination
          currentPage={page}
          totalPages={Math.ceil(totalResults / jobsPerPage)}
          filterValues={filterValues}
          jobSlug={jobSlug}
        />
      )}
    </div>
  );
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  filterValues: JobFilterValues;
  jobSlug?: string;
}

function Pagination({
  currentPage,
  totalPages,
  filterValues: { q, employmentType, salary, locationType },
  jobSlug,
}: PaginationProps) {
  function generatePageLink(page: number) {
    const searchParams = new URLSearchParams({
      ...(q && { q: q.trim() }),
      ...(employmentType && { employmentType }),
      ...(salary && { salary }),
      ...(locationType && { locationType }),
      ...(jobSlug && { job: jobSlug }),
      ...(page && { page: page.toString() }),
    });

    return `/jobs?${searchParams.toString()}`;
  }

  return (
    <div className="flex justify-between">
      <Link
        href={generatePageLink(currentPage - 1)}
        className={cn(
          "flex items-center gap-2 text-xs font-semibold text-gray-950 md:text-sm lg:text-md",
          currentPage <= 1 && "invisible",
        )}
      >
        <ArrowLeft size={16} />
        Previous page
      </Link>
      <span className="text-xs font-semibold text-gray-950 md:text-sm lg:text-md">
        Page {currentPage} of {totalPages}
      </span>
      <Link
        href={generatePageLink(currentPage + 1)}
        className={cn(
          "flex items-center gap-2 text-xs font-semibold text-gray-950 md:text-sm lg:text-md",
          currentPage >= totalPages && "invisible",
        )}
      >
        Next page
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}
