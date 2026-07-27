import { Suspense } from "react";

import { searchCompaniesAction } from "@/features/employer/search-companies";
import {
  SuggestedCompanies,
  SuggestedCompaniesSkeleton,
} from "@/widgets/companies-carousel";
import { SearchJumbotron } from "@/widgets/search-jumbotron";
import { CompanySearchTip } from "@/widgets/search-tip-section";

export async function CompaniesPage() {
  return (
    <div className="m-auto flex max-w-7xl flex-col gap-6 px-3 py-12">
      <SearchJumbotron
        title="Discover companies worth working for"
        subtitle="Browse employers who are hiring right now."
        placeholder="Search by company name"
        searchAction={searchCompaniesAction}
      />
      {/* The jumbotron and tips are static; only this section queries. */}
      <Suspense fallback={<SuggestedCompaniesSkeleton />}>
        <SuggestedCompanies />
      </Suspense>
      <CompanySearchTip />
    </div>
  );
}
