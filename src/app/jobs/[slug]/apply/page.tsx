"use client";

import { getApplicant } from "@/actions/applicants";
import { getJob } from "@/actions/jobs";
import JobApplicationForm from "@/components/jobs/JobApplicationForm";
import { useUser } from "@/contexts/UserContext";
import { Applicant, Job, JobApplication } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface PageProps {
  params: { slug: string };
}

export default function Page({ params: { slug } }: PageProps) {
  const router = useRouter();
  const { user } = useUser();
  const [job, setJob] = useState(null);
  const [hasApplication, setHasApplication] = useState(true);

  const handleGetJobAndApplicant = useCallback(
    async (jobSlug: string, userId: number) => {
      return await Promise.all([getJob(jobSlug), getApplicant(userId)]);
    },
    [],
  );

  const handleCheckIfApplicantHasApplication = (
    job: Job & { jobApplications: JobApplication[] },
    applicant: Applicant,
  ) => {
    const { jobApplications } = job;
    const { id } = applicant;
    return jobApplications.some(
      (application: JobApplication) => application.applicantId === id,
    );
  };

  const handleJobApplicationValidation = useCallback(
    async (jobSlug: string, userId: number) => {
      const [job, applicant] = await handleGetJobAndApplicant(jobSlug, userId);
      setJob(job);
      const hasApplication = handleCheckIfApplicantHasApplication(
        job,
        applicant,
      );
      if (hasApplication) {
        router.push(`/jobs/${slug}/submitted`);
      } else {
        setHasApplication(false);
      }
    },
    [router, slug, handleGetJobAndApplicant],
  );

  useEffect(() => {
    if (user && user?.id) {
      handleJobApplicationValidation(slug, user.id);
    }
  }, [slug, user, handleJobApplicationValidation]);

  return (
    <main className="mx-auto max-w-4xl p-4">
      <div className="h-full">
        {job && !hasApplication && <JobApplicationForm job={job} />}
      </div>
    </main>
  );
}
