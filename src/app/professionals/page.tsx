import { getInitialProfessionals } from "@/actions/professionals";
import ProfessionalFilter from "@/components/professionals/ProfessionalFilter";
import ProfessionalInitialList from "@/components/professionals/ProfessionalInitialList";
import ProfessionalSearchTip from "@/components/professionals/ProfessionalSearchTip";

export default async function Page() {
  const professionals = await getInitialProfessionals();

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
