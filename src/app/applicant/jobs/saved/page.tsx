"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useUser } from "@/contexts/UserContext";
import ApplicantSavedJobs from "@/components/applicant/ApplicantSavedJobs";
import { getApplicant } from "@/actions/applicants";
import { getApplicantSavedJobs } from "@/actions/savedJobs";
import ApplicantJobsEmptyPlaceholder from "@/components/applicant/ApplicantJobsEmptyPlaceholder";
import { Job, SavedJob } from "@prisma/client";
import ApplicantJobsLoadingPlaceholder from "@/components/applicant/ApplicantJobsLoadingPlaceholder";

export default function Page() {
  const { user } = useUser();
  const [applicant, setApplicant] = useState(null);
  const [savedJobs, setSavedJobs] = useState<
    (SavedJob & { job: Job })[] | null
  >(null);

  const hasEmptySavedJobs = useMemo(
    () => savedJobs && savedJobs.length === 0,
    [savedJobs],
  );

  const handleGetApplicant = useCallback(
    async (id: number) => await getApplicant(id),
    [],
  );

  const handleGetSavedJobs = useCallback(
    async (id: number) => await getApplicantSavedJobs(id),
    [],
  );

  const handleGetApplicantSavedJobs = useCallback(
    async (userId: number) => {
      const applicant = await handleGetApplicant(userId);
      setApplicant(applicant);
      if (applicant) {
        const savedJobs = await handleGetSavedJobs(applicant.id);
        setSavedJobs(savedJobs);
      }
    },
    [handleGetApplicant, handleGetSavedJobs],
  );

  useEffect(() => {
    if (user && user?.id) {
      handleGetApplicantSavedJobs(user.id);
    }
  }, [user, handleGetApplicantSavedJobs]);

  return (
    <>
      {applicant && savedJobs && <ApplicantSavedJobs savedJobs={savedJobs} />}
      {!applicant && !hasEmptySavedJobs && <ApplicantJobsLoadingPlaceholder />}
      {applicant && hasEmptySavedJobs && (
        <ApplicantJobsEmptyPlaceholder message="No saved jobs found" />
      )}
    </>
  );
}
