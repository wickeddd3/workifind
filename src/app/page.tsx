import { getInitialCompanies } from "@/actions/companies";
import CompanyInitialList from "@/components/companies/CompanyInitialList";
import JobFilter from "@/components/jobs/JobFilter";
import { JobFilterValues } from "@/lib/validation";

export default async function Home() {
  const filterValues: JobFilterValues = {
    q: "",
    employmentType: "",
    salary: "",
    locationType: "",
  };

  const companies = await getInitialCompanies();

  return (
    <main className="m-auto mb-10 space-y-6">
      <JobFilter defaultValues={filterValues} />
      <div className="m-auto flex h-full max-w-7xl flex-wrap items-center gap-4 px-3 md:flex-col">
        <section className="h-[300px] w-full rounded-2xl bg-gray-50"></section>
        {companies && <CompanyInitialList companies={companies} />}
        <section className="flex flex-wrap items-center justify-between gap-10">
          <div className="h-[300px] w-[600px] rounded-2xl bg-gray-50"></div>
          <div className="h-[300px] w-[600px] rounded-2xl bg-gray-50"></div>
        </section>
      </div>
    </main>
  );
}
