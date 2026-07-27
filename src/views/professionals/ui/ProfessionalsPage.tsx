import { Suspense } from "react";

import { searchProfessionalsAction } from "@/features/applicant/search-professionals";
import { SearchJumbotron } from "@/widgets/search-jumbotron";
import { ProfessionalSearchTip } from "@/widgets/search-tip-section";

import { SuggestedProfessionals } from "./carousel/SuggestedProfessionals";
import { SuggestedProfessionalsSkeleton } from "./carousel/SuggestedProfessionalsSkeleton";

export async function ProfessionalsPage() {
  return (
    <div className="m-auto flex max-w-7xl flex-col gap-6 px-3 py-12">
      <SearchJumbotron
        title="Find your next great hire"
        subtitle="Browse skilled professionals ready for their next role."
        placeholder="Search by profession"
        searchAction={searchProfessionalsAction}
      />
      {/* The jumbotron and tips are static; only this section queries. */}
      <Suspense fallback={<SuggestedProfessionalsSkeleton />}>
        <SuggestedProfessionals />
      </Suspense>
      <ProfessionalSearchTip />
    </div>
  );
}
