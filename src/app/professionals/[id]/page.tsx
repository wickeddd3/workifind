import ProfessionalDetails from "@/components/professionals/ProfessionalDetails";
import { cache } from "react";
import { notFound } from "next/navigation";
import { findProfessionalById } from "@/app/_services/professional";

interface PageProps {
  params: { id: string };
}

const handleFindProfessionalById = cache(async (id: number) => {
  const professional = await findProfessionalById(id);

  if (!professional) notFound();

  return professional;
});

export default async function Page({ params: { id } }: PageProps) {
  const professionalId = parseInt(id);
  const professional = await handleFindProfessionalById(professionalId);

  return (
    <main className="mx-auto h-full max-w-4xl p-4">
      {professional && <ProfessionalDetails professional={professional} />}
    </main>
  );
}
