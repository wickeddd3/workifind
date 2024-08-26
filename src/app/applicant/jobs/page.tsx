"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useUser } from "@/contexts/UserContext";
import ApplicantJobApplications from "@/components/applicant/ApplicantJobApplications";
import { getApplicantJobApplications } from "@/actions/jobApplications";
import { getApplicant } from "@/actions/applicants";
import ApplicantJobsEmptyPlaceholder from "@/components/applicant/ApplicantJobsEmptyPlaceholder";
import { Job, JobApplication } from "@prisma/client";

export default function Page() {
  const { user } = useUser();
  const [applicant, setApplicant] = useState(null);
  const [jobApplications, setJobApplications] = useState<
    (JobApplication & { job: Job })[] | null
  >(null);

  const hasEmptyJobApplications = useMemo(
    () => jobApplications && jobApplications.length === 0,
    [jobApplications],
  );

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
    <>
      {applicant && jobApplications && (
        <ApplicantJobApplications jobApplications={jobApplications} />
      )}
      {applicant && hasEmptyJobApplications && (
        <ApplicantJobsEmptyPlaceholder message="No job applications found" />
      )}
    </>
  );
}
