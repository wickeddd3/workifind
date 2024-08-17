import { Job, JobApplication } from "@prisma/client";
import ApplicantJobApplicationItem from "@/components/applicant/ApplicantJobApplicationItem";

interface ApplicantJobApplicationsProps {
  jobApplications: (JobApplication & { job: Job })[];
}

export default function ApplicantJobApplications({
  jobApplications,
}: ApplicantJobApplicationsProps) {
  return (
    <main className="m-auto space-y-6 px-4">
      <h1 className="px-4 text-xl font-medium">Applied jobs</h1>
      <div className="flex flex-col gap-2">
        {jobApplications.map((jobApplication) => (
          <ApplicantJobApplicationItem
            jobApplication={jobApplication}
            key={jobApplication.id}
          />
        ))}
      </div>
    </main>
  );
}
