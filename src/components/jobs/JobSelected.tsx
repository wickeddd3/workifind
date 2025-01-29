import JobSelectedDetails from "@/components/jobs/JobSelectedDetails";
import JobSelectedEmptyPlaceholder from "@/components/jobs/JobSelectedEmptyPlaceholder";
import { Employer, Job, JobApplication } from "@prisma/client";

interface JobPost extends Job {
  employer: Employer;
  jobApplications: JobApplication[];
}

interface JobSelectedProps {
  job: JobPost | null;
}

export default async function JobSelected({ job }: JobSelectedProps) {
  return (
    <section className="sticky top-0 hidden h-fit rounded-xl bg-background py-2 md:block md:w-3/5">
      <div className="m-auto h-full">
        {job && <JobSelectedDetails job={job} />}
        {!job && <JobSelectedEmptyPlaceholder />}
      </div>
    </section>
  );
}
