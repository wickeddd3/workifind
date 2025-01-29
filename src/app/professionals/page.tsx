import ProfessionalFilter from "@/components/professionals/ProfessionalFilter";
import ProfessionalInitialList from "@/components/professionals/ProfessionalInitialList";
import ProfessionalSearchTip from "@/components/professionals/ProfessionalSearchTip";
import { cache } from "react";
import { getInitialProfessionalList } from "@/app/_services/professionals";

const handleGetInitialProfessionalList = cache(async () => {
  return await getInitialProfessionalList();
});

export default async function Page() {
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
