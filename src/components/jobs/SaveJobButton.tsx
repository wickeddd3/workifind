"use client";

import { Button } from "@/components/ui/button";
import { Job, JobApplication } from "@prisma/client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useUser } from "@clerk/nextjs";
import {
  saveJob,
  saveJobAuthorize,
  unsaveJob,
} from "@/app/_services/applicant-saved-jobs";

interface SaveJobButtonProps {
  job: Job & { jobApplications: JobApplication[] };
}

export default function SaveJobButton({ job }: SaveJobButtonProps) {
  const { user, isSignedIn } = useUser();
  const role = useMemo(() => user?.unsafeMetadata.role || "", [user]);
  const isApplicant = useMemo(
    () => isSignedIn && role === "APPLICANT",
    [isSignedIn, role],
  );
  const [isInitialized, setIsInitialized] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const handleCheckAuthorization = useCallback(async () => {
    if (!user?.id) return;
    try {
      const authorized = await saveJobAuthorize(user.id, job.id);
      setIsAuthorized(authorized);
      setIsInitialized(true);
    } catch (error) {
      console.error("Error checking authorization:", error);
      setIsAuthorized(false);
      setIsInitialized(true);
    }
  }, [user, job]);

  const handleSaveJob = async () => {
    if (!user?.id) return;
    await saveJob(user?.id, job.id);
    handleCheckAuthorization();
  };

  const handleUnsaveJob = async () => {
    if (!user?.id) return;
    await unsaveJob(user?.id, job.id);
    handleCheckAuthorization();
  };

  useEffect(() => {
    handleCheckAuthorization();
  }, [handleCheckAuthorization]);

  if (!isApplicant) return null;

  return (
    <>
      {isInitialized && isAuthorized && (
        <Button
          className="w-fit bg-indigo-600 px-8 hover:bg-indigo-700"
          size="sm"
          onClick={handleSaveJob}
        >
          Save
        </Button>
      )}
      {isInitialized && !isAuthorized && (
        <Button
          className="w-fit bg-indigo-600 px-8 hover:bg-indigo-700"
          size="sm"
          onClick={handleUnsaveJob}
        >
          Unsave
        </Button>
      )}
    </>
  );
}
