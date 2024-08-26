"use client";

import { getApplicant } from "@/actions/applicants";
import { getApplicantInitialSavedJobs } from "@/actions/savedJobs";
import { useUser } from "@/contexts/UserContext";
import { useCallback, useEffect, useMemo, useState } from "react";
import SavedJobs from "@/components/home/saved/SavedJobs";
import SavedJobsEmptyPlaceholder from "@/components/home/saved/SavedJobsEmptyPlaceholder";
import { Applicant, Employer, Job, SavedJob } from "@prisma/client";
import SavedJobsUnauthenticated from "@/components/home/saved/SavedJobsUnauthenticated";
import SavedJobsLoadingPlaceholder from "@/components/home/saved/SavedJobsLoadingPlaceholder";

export default function HomeInitialSavedJobs() {
  const { user, userLoading } = useUser();
  const [applicant, setApplicant] = useState<Applicant | null>(null);
  const [savedJobs, setSavedJobs] = useState<
    (SavedJob & { job: Job & { employer: Employer } })[]
  >([]);

  const hasJobs = useMemo(() => savedJobs && savedJobs.length > 0, [savedJobs]);
  const isApplicant = useMemo(() => user && user.role === "APPLICANT", [user]);

  const handleGetApplicant = useCallback(
    async (id: number) => await getApplicant(id),
    [],
  );

  const handleGetSavedJobs = useCallback(
    async (id: number) => await getApplicantInitialSavedJobs(id),
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
    <section className="w-full py-8">
      {user && isApplicant && applicant && hasJobs && (
        <SavedJobs savedJobs={savedJobs} />
      )}
      {user && isApplicant && applicant && !hasJobs && (
        <SavedJobsEmptyPlaceholder />
      )}
      {user && !isApplicant && (
        <SavedJobsEmptyPlaceholder message="Only applicant can only save jobs" />
      )}
      {!user && !userLoading && <SavedJobsUnauthenticated />}
      {userLoading && <SavedJobsLoadingPlaceholder />}
    </section>
  );
}
