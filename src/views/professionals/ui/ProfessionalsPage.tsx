import { notFound } from "next/navigation";
import { Suspense } from "react";

import { searchProfessionalsAction } from "@/features/search-professionals";
import { getAuthUser } from "@/shared/lib/clerk.server";
import { SearchJumbotron } from "@/widgets/search-jumbotron";
import { ProfessionalSearchTip } from "@/widgets/search-tip-section";

import { SuggestedProfessionals } from "./carousel/SuggestedProfessionals";
import { SuggestedProfessionalsSkeleton } from "./carousel/SuggestedProfessionalsSkeleton";

export async function ProfessionalsPage() {
  // The candidate directory is for hiring, so it is employers only — an
  // applicant browsing here would be reading other candidates' personal data.
  const { userId, role } = await getAuthUser();

  if (!userId || role !== "EMPLOYER") return notFound();

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
