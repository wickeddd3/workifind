import { SearchJumbotron } from "@/widgets/search-jumbotron";
import { SuggestedProfessionals } from "@/widgets/professionals-carousel";
import { ProfessionalSearchTip } from "@/widgets/search-tip-section";
import { searchProfessionalsAction } from "@/features/applicant/search-professionals";

export async function ProfessionalsPage() {
  return (
    <main className="m-auto flex max-w-7xl flex-col gap-6 px-3 py-12">
      <SearchJumbotron
        title="Find your next potential hire"
        subtitle="Explore list of professionals you can hire"
        placeholder="Search by profession"
        searchAction={searchProfessionalsAction}
      />
      <SuggestedProfessionals />
      <ProfessionalSearchTip />
    </main>
  );
}
