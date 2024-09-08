"use client";

import { getApplicant } from "@/actions/applicants";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContext";
import { longLocalizedDate } from "@/lib/utils";
import { Applicant, Job, JobApplication } from "@prisma/client";
import { CircleCheckBig } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

interface ApplyButtonProps {
  job: Job & { jobApplications: JobApplication[] };
}

export default function ApplyButton({ job }: ApplyButtonProps) {
  const { user } = useUser();
  const [applicant, setApplicant] = useState(null);

  const handleGetApplicant = useCallback(
    async (id: number) => await getApplicant(id),
    [],
  );

  const handleCheckIfApplicantHasApplication = (
    job: Job & { jobApplications: JobApplication[] },
    applicant: Applicant | null,
  ) => {
    if (!applicant) return undefined;
    const { jobApplications } = job;
    const { id } = applicant;
    return (jobApplications || []).find(
      (application: JobApplication) => application.applicantId === id,
    );
  };

  const isApplicant = useMemo(() => {
    return user && user?.role === "APPLICANT";
  }, [user]);

  const hasApplication = useMemo(() => {
    return handleCheckIfApplicantHasApplication(job, applicant);
  }, [job, applicant]);

  const applicationCreated = useMemo(() => {
    const application: JobApplication | undefined =
      handleCheckIfApplicantHasApplication(job, applicant);
    if (application && application?.createdAt) {
      return `You applied on ${longLocalizedDate(application.createdAt)}`;
    }
    return "";
  }, [job, applicant]);

  useEffect(() => {
    if (user && user?.id) {
      handleGetApplicant(user.id).then(setApplicant);
    }
  }, [user, handleGetApplicant]);

  if (!user) return;

  if (isApplicant && applicant && hasApplication) {
    return (
      <h6 className="flex grow items-center gap-2 text-xs text-indigo-600 md:text-sm">
        <CircleCheckBig size={18} />
        {applicationCreated}
      </h6>
    );
  }

  if (isApplicant && applicant && !hasApplication) {
    return (
      <Button
        asChild
        className="w-fit bg-indigo-600 px-8 hover:bg-indigo-700"
        size="sm"
      >
        <Link href={`/jobs/${job.slug}/apply`}>Apply</Link>
      </Button>
    );
  }
}
