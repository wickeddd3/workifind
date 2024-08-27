"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useUser } from "@/contexts/UserContext";
import { getEmployerJobs, getEmployerJobsCount } from "@/actions/jobs";
import EmployerJobs from "@/components/employer/EmployerJobs";
import { Job, JobApplication } from "@prisma/client";
import EmployerJobsEmptyPlaceholder from "@/components/employer/EmployerJobsEmptyPlaceholder";
import EmployerJobsLoadingPlaceholder from "@/components/employer/EmployerJobsLoadingPlaceholder";

interface PageProps {
  searchParams: {
    page?: string;
  };
}

export default function Page({ searchParams: { page } }: PageProps) {
  const { user } = useUser();
  const [jobs, setJobs] = useState<
    (Job & { jobApplications: JobApplication[] })[] | null
  >(null);
  const [totalResults, setTotalResults] = useState(0);
  const hasEmptyJobs = useMemo(() => jobs && jobs.length === 0, [jobs]);
  const currentPage = page ? parseInt(page) : 1;
  const jobsPerPage = 5;
  const skip = (currentPage - 1) * jobsPerPage;

  const handleGetJobs = useCallback(
    async (id: number) => {
      const [jobs, totalResults] = await Promise.all([
        getEmployerJobs({
          id,
          take: jobsPerPage,
          skip,
        }),
        getEmployerJobsCount(id),
      ]);
      setJobs(jobs);
      setTotalResults(totalResults);
    },
    [skip],
  );

  useEffect(() => {
    if (user && user?.id) {
      handleGetJobs(user.id);
    }
  }, [user, handleGetJobs]);

  return (
    <>
      {jobs && (
        <EmployerJobs
          jobs={jobs}
          totalResults={totalResults}
          jobsPerPage={jobsPerPage}
          page={currentPage}
        />
      )}
      {!jobs && <EmployerJobsLoadingPlaceholder />}
      {hasEmptyJobs && <EmployerJobsEmptyPlaceholder message="No jobs found" />}
    </>
  );
}
