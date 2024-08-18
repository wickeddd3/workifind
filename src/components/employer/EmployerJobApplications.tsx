import { Applicant, JobApplication } from "@prisma/client";
import EmployerJobApplicationItem from "./EmployerJobApplicationItem";

interface EmployerJobApplicationsProps {
  jobApplications: (JobApplication & { applicant: Applicant })[];
}

export default function EmployerJobApplications({
  jobApplications,
}: EmployerJobApplicationsProps) {
  return (
    <div className="flex flex-col gap-4">
      {jobApplications.map((jobApplication) => (
        <EmployerJobApplicationItem
          jobApplication={jobApplication}
          key={jobApplication.id}
        />
      ))}
    </div>
  );
}
