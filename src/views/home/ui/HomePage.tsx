import dynamic from "next/dynamic";
import { Suspense } from "react";

import { HomeJobFilter } from "@/features/job/search-jobs/client";
import { buildWebsiteSchema } from "@/shared/lib/structured-data";
import { JsonLd } from "@/shared/ui/JsonLd";
import {
  SuggestedCompanies,
  SuggestedCompaniesSkeleton,
} from "@/widgets/companies-carousel";

import { MarketingSection } from "./MarketingSection";
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
    <div className="m-auto mb-10 gap-6" data-testid="home-page">
      <JsonLd data={buildWebsiteSchema()} />
      <HomeJobFilter />
      <div className="m-auto flex h-full max-w-7xl flex-wrap items-center gap-2 px-3 md:flex-col">
        <LazySearchHistory />

        {/* Per-viewer, so it resolves on the client and keeps this page
            prerenderable. */}
        <InitialSavedJobs />

        {/* Public data — prerendered with the page, but kept behind a boundary
            so an on-demand regeneration does not block the shell. */}
        <Suspense fallback={<SuggestedCompaniesSkeleton />}>
          <SuggestedCompanies hasSeeMoreButton={true} />
        </Suspense>
        <MarketingSection />
      </div>
    </div>
  );
}
