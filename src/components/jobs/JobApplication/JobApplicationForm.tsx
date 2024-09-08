"use client";

import { useCallback, useEffect, useState } from "react";
import { Applicant, Employer, Job } from "@prisma/client";
import { useUser } from "@/contexts/UserContext";
import { getApplicant } from "@/actions/applicants";
import JobDetails from "@/components/jobs/JobApplication/JobDetails";
import ApplicantDetails from "@/components/jobs/JobApplication/ApplicantDetails";
import ApplicationForm from "@/components/jobs/JobApplication/ApplicationForm";
import LoadingPlaceholder from "@/components/jobs/JobApplication/LoadingPlaceholder";

interface JobApplicationFormProps {
  job: Job & { employer: Employer };
}

export default function JobApplicationForm({ job }: JobApplicationFormProps) {
  const { user } = useUser();

  const [applicant, setApplicant] = useState<Applicant | null>(null);

  const handleGetApplicant = useCallback(
    async (id: number) => await getApplicant(id),
    [],
  );

  useEffect(() => {
    if (user && user?.id) {
      handleGetApplicant(user.id).then(setApplicant);
    }
  }, [user, handleGetApplicant]);

  return user && job && applicant ? (
    <section className="flex h-full w-full flex-col gap-4 md:gap-8">
      {job && <JobDetails job={job} />}
      {applicant && <ApplicantDetails applicant={applicant} />}
      {job && user && applicant && (
        <ApplicationForm job={job} user={user} applicant={applicant} />
      )}
    </section>
  ) : (
    <LoadingPlaceholder />
  );
}
