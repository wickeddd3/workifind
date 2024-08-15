import { getInitialCompanies } from "@/actions/companies";
import CompanyInitialList from "@/components/companies/CompanyInitialList";
import HomeMarketingSection from "@/components/home/HomeMarketingSection";
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
        <HomeMarketingSection />
      </div>
    </main>
  );
}
