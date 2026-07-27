import dynamic from "next/dynamic";
import { Suspense } from "react";

import { HomeJobFilter } from "@/features/search-jobs/client";
import { buildWebsiteSchema } from "@/shared/lib/structured-data";
import { JsonLd } from "@/shared/ui/JsonLd";
import {
  SuggestedCompanies,
  SuggestedCompaniesSkeleton,
} from "@/widgets/companies-carousel";
import { LatestJobs, LatestJobsSkeleton } from "@/widgets/latest-jobs";

import { MarketingSection } from "./MarketingSection";
import { PopularSearches } from "./PopularSearches";
import { InitialSavedJobs } from "./saved-jobs/InitialSavedJobs";
import { LoadingPlaceholder } from "./search-history/LoadingPlaceholder";

const LazySearchHistory = dynamic(
  () =>
    import("./search-history/SearchHistory").then(
      (module) => module.SearchHistory,
    ),
  {
    loading: () => <LoadingPlaceholder />,
    ssr: false,
  },
);

export async function HomePage() {
  return (
    <div className="mb-10 flex flex-col" data-testid="home-page">
      <JsonLd data={buildWebsiteSchema()} />
      <HomeJobFilter />

      <div className="m-auto flex h-full w-full max-w-7xl flex-col gap-2 px-3 pt-4">
        <LazySearchHistory />

        {/* Openings lead the page below the hero. The inventory is the reason
            to be here, and it is the same for every visitor, so it prerenders
            with the shell. */}
        <Suspense fallback={<LatestJobsSkeleton />}>
          <LatestJobs limit={6} />
        </Suspense>

        <PopularSearches />

        {/* Public data — prerendered with the page, but kept behind a boundary
            so an on-demand regeneration does not block the shell. */}
        <Suspense fallback={<SuggestedCompaniesSkeleton />}>
          <SuggestedCompanies hasSeeMoreButton={true} />
        </Suspense>

        {/* Per-viewer, so it resolves on the client and keeps this page
            prerenderable. Sits below the public content: for a signed-out
            visitor this is a sign-in prompt, which had been occupying the
            most valuable slot on the page. */}
        <InitialSavedJobs />

        <MarketingSection />
      </div>
    </div>
  );
}
