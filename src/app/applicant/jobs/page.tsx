"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useUser } from "@/contexts/UserContext";
import ApplicantJobApplications from "@/components/applicant/ApplicantJobApplications";
import {
  getApplicantJobApplications,
  getApplicantJobApplicationsCount,
} from "@/actions/jobApplications";
import { getApplicant } from "@/actions/applicants";
import ApplicantJobsEmptyPlaceholder from "@/components/applicant/ApplicantJobsEmptyPlaceholder";
import { Job, JobApplication } from "@prisma/client";
import ApplicantJobsLoadingPlaceholder from "@/components/applicant/ApplicantJobsLoadingPlaceholder";

interface PageProps {
  searchParams: {
    page?: string;
  };
}

export default function Page({ searchParams: { page } }: PageProps) {
  const { user } = useUser();
  const [applicant, setApplicant] = useState(null);
  const [jobApplications, setJobApplications] = useState<
    (JobApplication & { job: Job })[] | null
  >(null);
  const [totalResults, setTotalResults] = useState(0);
  const hasEmptyJobApplications = useMemo(
    () => jobApplications && jobApplications.length === 0,
    [jobApplications],
  );
  const currentPage = page ? parseInt(page) : 1;
  const jobsPerPage = 5;
  const skip = (currentPage - 1) * jobsPerPage;

  const handleGetApplicantJobApplications = useCallback(
    async (userId: number) => {
      const applicant = await getApplicant(userId);
      setApplicant(applicant);
      if (applicant) {
        const [jobApplications, totalResults] = await Promise.all([
          getApplicantJobApplications({
            id: applicant.id,
            take: jobsPerPage,
            skip,
          }),
          getApplicantJobApplicationsCount(applicant.id),
        ]);
        setJobApplications(jobApplications);
        setTotalResults(totalResults);
      }
    },
    [skip],
  );

  useEffect(() => {
    if (user && user?.id) {
      handleGetApplicantJobApplications(user.id);
    }
  }, [user, handleGetApplicantJobApplications]);

  return (
    <>
      {applicant && jobApplications && (
        <ApplicantJobApplications
          jobApplications={jobApplications}
          totalResults={totalResults}
          jobsPerPage={jobsPerPage}
          page={currentPage}
        />
      )}
      {!applicant && !hasEmptyJobApplications && (
        <ApplicantJobsLoadingPlaceholder />
      )}
      {applicant && hasEmptyJobApplications && (
        <ApplicantJobsEmptyPlaceholder message="No job applications found" />
      )}
    </>
  );
}
