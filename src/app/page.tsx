import HomeJobFilter from "@/components/home/HomeJobFilter";
import HomeInitialCompanyList from "@/components/home/HomeInitialCompanyList";
import HomeInitialSavedJobs from "@/components/home/HomeInitialSavedJobs";
import HomeMarketingSection from "@/components/home/HomeMarketingSection";
import HomeSearchHistory from "@/components/home/HomeSearchHistory";
import { JobFilterValues } from "@/lib/validation";

export default function Page() {
  const filterValues: JobFilterValues = {
    q: "",
    employmentType: "",
    salary: "",
    locationType: "",
  };

  return (
    <main className="m-auto mb-10 gap-6">
      <HomeJobFilter defaultValues={filterValues} />
      <div className="m-auto flex h-full max-w-7xl flex-wrap items-center gap-2 px-3 md:flex-col">
        <HomeSearchHistory />
        <HomeInitialSavedJobs />
        <HomeInitialCompanyList />
        <HomeMarketingSection />
      </div>
    </main>
  );
}
