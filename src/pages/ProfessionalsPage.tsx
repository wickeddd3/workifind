import ProfessionalFilter from "@/components/professionals/ProfessionalFilter";
import ProfessionalInitialList from "@/components/professionals/ProfessionalInitialList";
import { cache } from "react";
import { getInitialProfessionalList } from "@/app/_services/professionals";
import { ProfessionalSearchTip } from "@/widgets/search-tip-section";

const handleGetInitialProfessionalList = cache(async () => {
  return await getInitialProfessionalList();
});

export async function ProfessionalsPage() {
  const professionals = await handleGetInitialProfessionalList();

  return (
    <main className="m-auto flex max-w-7xl flex-col gap-6 px-3 py-12">
      <ProfessionalFilter />
      {professionals && (
        <ProfessionalInitialList professionals={professionals} />
      )}
      <ProfessionalSearchTip />
    </main>
  );
}
