import { HomeJobFilter } from "@/features/job/search-jobs/client";
import { SuggestedCompanies } from "@/widgets/companies-carousel";
import { MarketingSection } from "@/widgets/marketing-section";
import { SearchHistory } from "@/widgets/search-history";
import { InitialSavedJobs } from "@/widgets/initial-saved-jobs";

export function HomePage() {
  return (
    <div className="m-auto mb-10 gap-6" data-testid="home-page">
      <HomeJobFilter />
      <div className="m-auto flex h-full max-w-7xl flex-wrap items-center gap-2 px-3 md:flex-col">
        <SearchHistory />
        <InitialSavedJobs />
        <SuggestedCompanies hasSeeMoreButton={true} />
        <MarketingSection />
      </div>
    </div>
  );
}
