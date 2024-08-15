import HomeInitialCompanyList from "@/components/home/HomeInitialCompanyList";
import HomeInitialSavedJobs from "@/components/home/HomeInitialSavedJobs";
import HomeMarketingSection from "@/components/home/HomeMarketingSection";
import HomeSearchHistory from "@/components/home/HomeSearchHistory";
import JobFilter from "@/components/jobs/JobFilter";
import { JobFilterValues } from "@/lib/validation";

export default function Page() {
  const filterValues: JobFilterValues = {
    q: "",
    employmentType: "",
    salary: "",
    locationType: "",
  };

  return (
    <main className="m-auto mb-10 space-y-6">
      <JobFilter defaultValues={filterValues} />
      <div className="m-auto flex h-full max-w-7xl flex-wrap items-center gap-6 px-3 md:flex-col">
        <HomeSearchHistory />
        <HomeInitialSavedJobs />
        <HomeInitialCompanyList />
        <HomeMarketingSection />
      </div>
    </main>
  );
}
