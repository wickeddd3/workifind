import { Job, JobApplication } from "@prisma/client";
import ApplicantJobApplicationItem from "@/components/applicant/ApplicantJobApplicationItem";

interface ApplicantJobApplicationsProps {
  jobApplications: (JobApplication & { job: Job })[];
}

export default function ApplicantJobApplications({
  jobApplications,
}: ApplicantJobApplicationsProps) {
  return (
    <>
      {jobApplications.map((jobApplication) => (
        <ApplicantJobApplicationItem
          jobApplication={jobApplication}
          key={jobApplication.id}
        />
      ))}
    </>
  );
}
