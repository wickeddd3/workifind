import { Job, JobApplication } from "@prisma/client";
import EmployerJobItem from "@/components/employer/EmployerJobItem";

interface EmployerJobsProps {
  jobs: (Job & { jobApplications: JobApplication[] })[];
}

export default function EmployerJobs({ jobs }: EmployerJobsProps) {
  return (
    <>
      {jobs.map((job) => (
        <EmployerJobItem job={job} key={job.id} />
      ))}
    </>
  );
}
