import {
  SearchJumbotron,
  searchProfessionals,
} from "@/widgets/search-jumbotron";
import { SuggestedProfessionals } from "@/widgets/professionals-carousel";
import { ProfessionalSearchTip } from "@/widgets/search-tip-section";

export async function ProfessionalsPage() {
  return (
    <main className="m-auto flex max-w-7xl flex-col gap-6 px-3 py-12">
      <SearchJumbotron
        title="Find your next potential hire"
        subtitle="Explore list of professionals you can hire"
        placeholder="Search by profession"
        searchAction={searchProfessionals}
      />
      <SuggestedProfessionals />
      <ProfessionalSearchTip />
    </main>
  );
}
