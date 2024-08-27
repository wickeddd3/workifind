"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useUser } from "@/contexts/UserContext";
import ApplicantSavedJobs from "@/components/applicant/ApplicantSavedJobs";
import { getApplicant } from "@/actions/applicants";
import {
  getApplicantSavedJobs,
  getApplicantSavedJobsCount,
} from "@/actions/savedJobs";
import ApplicantJobsEmptyPlaceholder from "@/components/applicant/ApplicantJobsEmptyPlaceholder";
import { Job, SavedJob } from "@prisma/client";
import ApplicantJobsLoadingPlaceholder from "@/components/applicant/ApplicantJobsLoadingPlaceholder";

interface PageProps {
  searchParams: {
    page?: string;
  };
}

export default function Page({ searchParams: { page } }: PageProps) {
  const { user } = useUser();
  const [applicant, setApplicant] = useState(null);
  const [savedJobs, setSavedJobs] = useState<
    (SavedJob & { job: Job })[] | null
  >(null);
  const [totalResults, setTotalResults] = useState(0);
  const hasEmptySavedJobs = useMemo(
    () => savedJobs && savedJobs.length === 0,
    [savedJobs],
  );
  const currentPage = page ? parseInt(page) : 1;
  const jobsPerPage = 5;
  const skip = (currentPage - 1) * jobsPerPage;

  const handleGetApplicantSavedJobs = useCallback(
    async (userId: number) => {
      const applicant = await getApplicant(userId);
      setApplicant(applicant);
      if (applicant) {
        const [savedJobs, totalResults] = await Promise.all([
          getApplicantSavedJobs({
            id: applicant.id,
            take: jobsPerPage,
            skip,
          }),
          getApplicantSavedJobsCount(applicant.id),
        ]);
        setSavedJobs(savedJobs);
        setTotalResults(totalResults);
      }
    },
    [skip],
  );

  useEffect(() => {
    if (user && user?.id) {
      handleGetApplicantSavedJobs(user.id);
    }
  }, [user, handleGetApplicantSavedJobs]);

  return (
    <>
      {applicant && savedJobs && (
        <ApplicantSavedJobs
          savedJobs={savedJobs}
          totalResults={totalResults}
          jobsPerPage={jobsPerPage}
          page={currentPage}
        />
      )}
      {!applicant && !hasEmptySavedJobs && <ApplicantJobsLoadingPlaceholder />}
      {applicant && hasEmptySavedJobs && (
        <ApplicantJobsEmptyPlaceholder message="No saved jobs found" />
      )}
    </>
  );
}
