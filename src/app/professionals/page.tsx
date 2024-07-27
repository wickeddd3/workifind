import { getInitialProfessionals } from "@/actions/professionals";
import ProfessionalFilter from "@/components/professionals/ProfessionalFilter";
import ProfessionalInitialList from "@/components/professionals/ProfessionalInitialList";
import ProfessionalSearchTip from "@/components/professionals/ProfessionalSearchTip";

export default async function Page() {
  const professionals = await getInitialProfessionals();

  return (
    <main className="m-auto mb-10 max-w-5xl space-y-6">
      <ProfessionalFilter />
      {professionals && (
        <ProfessionalInitialList professionals={professionals} />
      )}
      <ProfessionalSearchTip />
    </main>
  );
}
