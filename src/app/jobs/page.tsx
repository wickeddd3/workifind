import JobFilter from "@/components/jobs/JobFilter";
import JobResults from "@/components/jobs/JobResults";
import JobSelected from "@/components/jobs/JobSelected";
import { JobFilterValues } from "@/lib/validation";

interface PageProps {
  searchParams: {
    q?: string;
    type?: string;
    salary?: string;
    setup?: string;
    jobId?: string;
  };
}

export default function Page({
  searchParams: { q, type, salary, setup, jobId },
}: PageProps) {
  const filterValues: JobFilterValues = {
    q,
    type,
    salary,
    setup,
  };

  return (
    <main className="m-auto mb-10 space-y-6">
      <JobFilter defaultValues={filterValues} />
      <section className="m-auto flex h-full max-w-7xl gap-4 px-3 md:flex-row">
        <JobResults filterValues={filterValues} />
        <JobSelected jobId={jobId ? parseInt(jobId) : undefined} />
      </section>
    </main>
  );
}
