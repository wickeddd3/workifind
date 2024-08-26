"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useUser } from "@/contexts/UserContext";
import { getEmployerJobs } from "@/actions/jobs";
import EmployerJobs from "@/components/employer/EmployerJobs";
import { Job, JobApplication } from "@prisma/client";
import EmployerJobsEmptyPlaceholder from "@/components/employer/EmployerJobsEmptyPlaceholder";

export default function Page() {
  const { user } = useUser();
  const [jobs, setJobs] = useState<
    (Job & { jobApplications: JobApplication[] })[] | null
  >(null);

  const hasEmptyJobs = useMemo(() => jobs && jobs.length === 0, [jobs]);

  const handleGetJobs = useCallback(
    async (id: number) => await getEmployerJobs(id),
    [],
  );

  useEffect(() => {
    if (user && user?.id) {
      handleGetJobs(user.id).then(setJobs);
    }
  }, [user, handleGetJobs]);

  return (
    <>
      {jobs && <EmployerJobs jobs={jobs} />}
      {hasEmptyJobs && <EmployerJobsEmptyPlaceholder message="No jobs found" />}
    </>
  );
}
