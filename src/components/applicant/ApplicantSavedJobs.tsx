import { Job, SavedJob } from "@prisma/client";
import ApplicantSavedJobItem from "@/components/applicant/ApplicantSavedJobItem";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ApplicantSavedJobsProps {
  savedJobs: (SavedJob & { job: Job })[];
  totalResults: number;
  jobsPerPage: number;
  page: number;
}

export default function ApplicantSavedJobs({
  savedJobs,
  totalResults,
  jobsPerPage,
  page,
}: ApplicantSavedJobsProps) {
  return (
    <main className="m-auto space-y-6 px-4">
      <h1 className="px-4 text-xl font-medium">Saved jobs</h1>
      <div className="flex flex-col gap-4">
        {savedJobs.map((savedJob) => (
          <ApplicantSavedJobItem savedJob={savedJob} key={savedJob.id} />
        ))}
        {savedJobs.length > 0 && (
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

    return `/applicant/jobs/saved?${searchParams.toString()}`;
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
