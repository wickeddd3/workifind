import ProfessionalDetails from "@/components/professionals/ProfessionalDetails";
import { cache } from "react";
import { notFound } from "next/navigation";
import { findProfessionalById } from "@/app/_services/professional";

const handleFindProfessionalById = cache(async (id: number) => {
  const professional = await findProfessionalById(id);

  if (!professional) notFound();

  return professional;
});

export async function ProfessionalPage({ id }: { id: string }) {
  const professionalId = parseInt(id);
  const professional = await handleFindProfessionalById(professionalId);

  return (
    <main className="mx-auto h-full max-w-4xl p-4">
      {professional && <ProfessionalDetails professional={professional} />}
    </main>
  );
}
