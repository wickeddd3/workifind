"use client";

import { Button } from "@/components/ui/button";
import { Job, JobApplication } from "@prisma/client";
import { CircleCheckBig } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { applyToJobAuthorize } from "@/app/_services/applicant-job-applications";

interface ApplyButtonProps {
  job: Job & { jobApplications: JobApplication[] };
}

export default function ApplyButton({ job }: ApplyButtonProps) {
  const { user, isSignedIn } = useUser();
  const role = useMemo(() => user?.unsafeMetadata.role || "", [user]);
  const isApplicant = useMemo(
    () => isSignedIn && role === "APPLICANT",
    [isSignedIn, role],
  );
  const [isAuthorized, setIsAuthorized] = useState(false);

  const handleCheckAuthorization = useCallback(async () => {
    if (!user?.id) return;
    try {
      const authorized = await applyToJobAuthorize(user.id, job.id);
      setIsAuthorized(authorized);
    } catch (error) {
      console.error("Error checking authorization:", error);
      setIsAuthorized(false);
    }
  }, [user, job]);

  useEffect(() => {
    handleCheckAuthorization();
  }, [handleCheckAuthorization]);

  if (!isApplicant) return null;

  return (
    <>
      {isAuthorized && (
        <Button
          asChild
          className="w-fit bg-indigo-600 px-8 hover:bg-indigo-700"
          size="sm"
        >
          <Link href={`/jobs/${job.slug}/apply`}>Apply</Link>
        </Button>
      )}
      {!isAuthorized && (
        <span className="flex grow items-center gap-2 text-xs text-indigo-600 md:text-sm">
          <CircleCheckBig size={18} />
          Applied
        </span>
      )}
    </>
  );
}
