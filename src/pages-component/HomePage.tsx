import dynamic from "next/dynamic";
import { Suspense } from "react";

import { HomeJobFilter } from "@/features/job/search-jobs/client";
import { buildWebsiteSchema } from "@/shared/lib/structured-data";
import { JsonLd } from "@/shared/ui/JsonLd";
import {
  SuggestedCompanies,
  SuggestedCompaniesSkeleton,
} from "@/widgets/companies-carousel";
import {
  InitialSavedJobs,
  SavedJobsLoadingPlaceholder,
} from "@/widgets/initial-saved-jobs";
import { MarketingSection } from "@/widgets/marketing-section";
import { LoadingPlaceholder } from "@/widgets/search-history";

const LazySearchHistory = dynamic(
  () =>
    import("@/widgets/search-history").then((module) => module.SearchHistory),
  {
    loading: () => <LoadingPlaceholder />,
    ssr: false,
  },
);

export async function HomePage() {
  return (
    <div className="m-auto mb-10 gap-6" data-testid="home-page">
      <JsonLd data={buildWebsiteSchema()} />
      <HomeJobFilter />
      <div className="m-auto flex h-full max-w-7xl flex-wrap items-center gap-2 px-3 md:flex-col">
        <LazySearchHistory />

        {/* Both hit the database, and neither blocks the hero above. Streaming
            them lets the page paint on the first flush. */}
        <Suspense fallback={<SavedJobsLoadingPlaceholder />}>
          <InitialSavedJobs />
        </Suspense>
        <Suspense fallback={<SuggestedCompaniesSkeleton />}>
          <SuggestedCompanies hasSeeMoreButton={true} />
        </Suspense>
        <MarketingSection />
      </div>
    </div>
  );
}
