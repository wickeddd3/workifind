import { Job, JobApplication } from "@prisma/client";
import EmployerJobItem from "@/components/employer/EmployerJobItem";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmployerJobsProps {
  jobs: (Job & { jobApplications: JobApplication[] })[];
  totalResults: number;
  jobsPerPage: number;
  page: number;
}

export default function EmployerJobs({
  jobs,
  totalResults,
  jobsPerPage,
  page,
}: EmployerJobsProps) {
  return (
    <main className="m-auto space-y-6">
      <h1 className="px-2 text-xl font-medium">My jobs</h1>
      <div className="flex flex-col gap-4">
        {jobs.map((job) => (
          <EmployerJobItem job={job} key={job.id} />
        ))}
        {jobs.length > 0 && (
          <Pagination
            currentPage={page}
            totalPages={Math.ceil(totalResults / jobsPerPage)}
          />
        )}
      </div>
    </main>
  );
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

function Pagination({ currentPage, totalPages }: PaginationProps) {
  function generatePageLink(page: number) {
    const searchParams = new URLSearchParams({
      ...(page && { page: page.toString() }),
    });

    return `/employer/jobs?${searchParams.toString()}`;
  }

  return (
    <div className="flex justify-between">
      <Link
        href={generatePageLink(currentPage - 1)}
        className={cn(
          "flex items-center gap-2 font-semibold",
          currentPage <= 1 && "invisible",
        )}
      >
        <ArrowLeft size={16} />
        Previous page
      </Link>
      <span className="font-semibold">
        Page {currentPage} of {totalPages}
      </span>
      <Link
        href={generatePageLink(currentPage + 1)}
        className={cn(
          "flex items-center gap-2 font-semibold",
          currentPage >= totalPages && "invisible",
        )}
      >
        Next page
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}
