import dynamic from "next/dynamic";
import HomeJobFilter from "@/components/home/HomeJobFilter";
import { JobFilterSchemaType } from "@/shared/schema/job-filter";
import { SuggestedCompanies } from "@/widgets/companies-carousel";
import { MarketingSection } from "@/widgets/marketing-section";

const DynamicHomeInitialSavedJobs = dynamic(
  () => import("@/components/home/HomeInitialSavedJobs"),
);

const DynamicHomeSearchHistory = dynamic(
  () => import("@/components/home/HomeSearchHistory"),
);

export function HomePage() {
  const filterValues: JobFilterSchemaType = {
    q: "",
    employmentType: "",
    salary: "",
    locationType: "",
  };

  return (
    <div className="m-auto mb-10 gap-6" data-testid="home-page">
      <HomeJobFilter defaultValues={filterValues} />
      <div className="m-auto flex h-full max-w-7xl flex-wrap items-center gap-2 px-3 md:flex-col">
        <DynamicHomeSearchHistory />
        <DynamicHomeInitialSavedJobs />
        <SuggestedCompanies hasSeeMoreButton={true} />
        <MarketingSection />
      </div>
    </div>
  );
}
