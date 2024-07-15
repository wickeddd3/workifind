import JobFilter from "@/components/jobs/JobFilter";
import JobResults from "@/components/jobs/JobResults";
import JobSelected from "@/components/jobs/JobSelected";

export default function Page() {
  return (
    <main className="m-auto mb-10 space-y-6">
      <JobFilter />
      <section className="m-auto flex h-full max-w-7xl gap-4 px-3 md:flex-row">
        <JobResults />
        <JobSelected />
      </section>
    </main>
  );
}
