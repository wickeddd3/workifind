"use client";

import { getApplicant } from "@/actions/applicants";
import { saveJob, unsaveJob } from "@/actions/jobs";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContext";
import { Applicant, Job, JobApplication, SavedJob } from "@prisma/client";
import { useCallback, useEffect, useMemo, useState } from "react";

interface SaveJobButtonProps {
  job: Job & { jobApplications: JobApplication[] };
}

export default function SaveJobButton({ job }: SaveJobButtonProps) {
  const { user } = useUser();
  const [applicant, setApplicant] = useState<
    (Applicant & { savedJobs: SavedJob[] }) | null
  >(null);

  const handleGetApplicant = useCallback(
    async (id: number) => await getApplicant(id),
    [],
  );

  const handleCheckIfApplicantHasSavedThisJob = (
    job: Job & { jobApplications: JobApplication[] },
    applicant: (Applicant & { savedJobs: SavedJob[] }) | null,
  ) => {
    if (!applicant) return undefined;
    const { savedJobs, id: applicantId } = applicant;
    const { id: jobId } = job;
    return (savedJobs || []).find(
      (savedJob: SavedJob) =>
        savedJob.jobId === jobId && savedJob.applicantId === applicantId,
    );
  };

  const isApplicant = useMemo(() => {
    return user && user?.role === "APPLICANT";
  }, [user]);

  const saveJobButtonText = useMemo(() => {
    const savedJob: SavedJob | undefined =
      handleCheckIfApplicantHasSavedThisJob(job, applicant);
    if (savedJob) {
      return "Unsave";
    }
    return "Save";
  }, [job, applicant]);

  const handleSaveJob = async () => {
    await saveJob(applicant?.id, job?.id, user?.role, job?.slug);
    if (user) handleGetApplicant(user?.id).then(setApplicant);
  };

  const handleUnsaveJob = async () => {
    await unsaveJob(applicant?.id, job?.id, user?.role, job?.slug);
    if (user) handleGetApplicant(user?.id).then(setApplicant);
  };

  const handleSaveOrUnsaveJob = async () => {
    const savedJob: SavedJob | undefined =
      handleCheckIfApplicantHasSavedThisJob(job, applicant);
    if (savedJob) {
      return await handleUnsaveJob();
    }

    return await handleSaveJob();
  };

  useEffect(() => {
    if (user && user?.id) {
      handleGetApplicant(user.id).then(setApplicant);
    }
  }, [user, handleGetApplicant]);

  if (!user) return;

  if (isApplicant && applicant) {
    return (
      <Button
        className="w-fit bg-indigo-600 px-8 hover:bg-indigo-700"
        size="sm"
        onClick={handleSaveOrUnsaveJob}
      >
        {saveJobButtonText}
      </Button>
    );
  }
}
