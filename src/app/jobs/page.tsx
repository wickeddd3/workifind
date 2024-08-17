import JobFilter from "@/components/jobs/JobFilter";
import JobResults from "@/components/jobs/JobResults";
import JobSelected from "@/components/jobs/JobSelected";
import { JobFilterValues } from "@/lib/validation";

interface PageProps {
  searchParams: {
    q?: string;
    employmentType?: string;
    salary?: string;
    locationType?: string;
    job?: string;
    page?: string;
  };
}

export default function Page({
  searchParams: { q, employmentType, salary, locationType, job, page },
}: PageProps) {
  const filterValues: JobFilterValues = {
    q,
    employmentType,
    salary,
    locationType,
  };

  return (
    <main className="m-auto mb-10 space-y-6">
      <JobFilter defaultValues={filterValues} />
      <section className="m-auto flex h-full max-w-7xl gap-4 px-3 md:flex-row">
        <JobResults
          filterValues={filterValues}
          page={page ? parseInt(page) : undefined}
          jobSlug={job}
        />
        <JobSelected jobSlug={job} />
      </section>
    </main>
  );
}
