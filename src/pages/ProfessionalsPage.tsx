import ProfessionalFilter from "@/components/professionals/ProfessionalFilter";
import { SuggestedProfessionals } from "@/widgets/professionals-carousel";
import { ProfessionalSearchTip } from "@/widgets/search-tip-section";

export async function ProfessionalsPage() {
  return (
    <main className="m-auto flex max-w-7xl flex-col gap-6 px-3 py-12">
      <ProfessionalFilter />
      <SuggestedProfessionals />
      <ProfessionalSearchTip />
    </main>
  );
}
