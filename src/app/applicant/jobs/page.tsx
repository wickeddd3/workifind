"use client";

import { useCallback, useEffect, useState } from "react";
import { useUser } from "@/contexts/UserContext";
import ApplicantJobApplications from "@/components/applicant/ApplicantJobApplications";
import { getApplicantJobApplications } from "@/actions/jobApplications";
import { getApplicant } from "@/actions/applicants";

export default function Page() {
  const { user } = useUser();
  const [applicant, setApplicant] = useState(null);
  const [jobApplications, setJobApplications] = useState(null);

  const handleGetApplicant = useCallback(
    async (id: number) => await getApplicant(id),
    [],
  );

  const handleGetJobApplications = useCallback(
    async (id: number) => await getApplicantJobApplications(id),
    [],
  );

  const handleGetApplicantJobApplications = useCallback(
    async (userId: number) => {
      const applicant = await handleGetApplicant(userId);
      setApplicant(applicant);
      if (applicant) {
        const jobApplications = await handleGetJobApplications(applicant.id);
        setJobApplications(jobApplications);
      }
    },
    [handleGetApplicant, handleGetJobApplications],
  );

  useEffect(() => {
    if (user && user?.id) {
      handleGetApplicantJobApplications(user.id);
    }
  }, [user, handleGetApplicantJobApplications]);

  return (
    applicant &&
    jobApplications && (
      <ApplicantJobApplications jobApplications={jobApplications} />
    )
  );
}
