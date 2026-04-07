"use client";

import { Button } from "@/shared/ui/button";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Job } from "@/entities/job";
import { authorizeSaveJobAttempt } from "../model/authorize-saved-job";
import { saveJobPost, unsaveJobPost } from "../model/save-job";

export function SaveButton({ job }: { job: Job }) {
  const { user, isSignedIn } = useUser();
  const role = useMemo(
    () => user?.unsafeMetadata.role || user?.publicMetadata.role || "",
    [user],
  );
  const isApplicant = useMemo(
    () => isSignedIn && role === "APPLICANT",
    [isSignedIn, role],
  );
  const [isInitialized, setIsInitialized] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const handleCheckAuthorization = useCallback(async () => {
    if (!user?.id) return;
    try {
      const authorized = await authorizeSaveJobAttempt(user.id, job.id);
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
    await saveJobPost(user?.id, job.id);
    handleCheckAuthorization();
  };

  const handleUnsaveJob = async () => {
    if (!user?.id) return;
    await unsaveJobPost(user?.id, job.id);
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
