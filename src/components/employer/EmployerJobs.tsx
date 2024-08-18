import { Job, JobApplication } from "@prisma/client";
import EmployerJobItem from "@/components/employer/EmployerJobItem";

interface EmployerJobsProps {
  jobs: (Job & { jobApplications: JobApplication[] })[];
}

export default function EmployerJobs({ jobs }: EmployerJobsProps) {
  return (
    <main className="m-auto space-y-6 px-4">
      <h1 className="px-4 text-xl font-medium">My jobs</h1>
      <div className="flex flex-col gap-2">
        {jobs.map((job) => (
          <EmployerJobItem job={job} key={job.id} />
        ))}
      </div>
    </main>
  );
}
