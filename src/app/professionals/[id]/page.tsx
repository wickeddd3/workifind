import { getProfessional } from "@/actions/professionals";
import ProfessionalDetails from "@/components/professionals/ProfessionalDetails";

interface PageProps {
  params: { id: string };
}

export default async function Page({ params: { id } }: PageProps) {
  const professionalId = parseInt(id);
  const professional = await getProfessional(professionalId);

  return (
    <main className="mx-auto max-w-4xl p-4">
      <div className="h-full">
        {professional && <ProfessionalDetails professional={professional} />}
      </div>
    </main>
  );
}
