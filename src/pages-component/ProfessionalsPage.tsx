import { searchProfessionalsAction } from "@/features/applicant/search-professionals";
import { SuggestedProfessionals } from "@/widgets/professionals-carousel";
import { SearchJumbotron } from "@/widgets/search-jumbotron";
import { ProfessionalSearchTip } from "@/widgets/search-tip-section";

export async function ProfessionalsPage() {
  return (
    <div className="m-auto flex max-w-7xl flex-col gap-6 px-3 py-12">
      <SearchJumbotron
        title="Find your next great hire"
        subtitle="Browse skilled professionals ready for their next role."
        placeholder="Search by profession"
        searchAction={searchProfessionalsAction}
      />
      <SuggestedProfessionals />
      <ProfessionalSearchTip />
    </div>
  );
}
