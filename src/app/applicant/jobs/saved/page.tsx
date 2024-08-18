"use client";

import { useCallback, useEffect, useState } from "react";
import { useUser } from "@/contexts/UserContext";
import ApplicantSavedJobs from "@/components/applicant/ApplicantSavedJobs";
import { getApplicant } from "@/actions/applicants";
import { getApplicantSavedJobs } from "@/actions/savedJobs";

export default function Page() {
  const { user } = useUser();
  const [applicant, setApplicant] = useState(null);
  const [savedJobs, setSavedJobs] = useState(null);

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

  return applicant && savedJobs && <ApplicantSavedJobs savedJobs={savedJobs} />;
}
