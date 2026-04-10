import { getSuggestedProfessionalsQuery } from "../api/professional.queries";
import { ProfessionalsCarousel } from "./ProfessionalsCarousel";

export async function SuggestedProfessionals() {
  const professionals = await getSuggestedProfessionalsQuery({ size: 8 });

  return (
    <section className="flex flex-col space-y-2 py-6">
      <h1 className="text-md font-semibold text-gray-900 md:text-lg lg:text-xl">
        Explore professionals
      </h1>
      <h5 className="text-sm font-normal text-gray-700 md:text-md">
        Learn about new jobs and company culture.
      </h5>
      <div className="flex py-4">
        <ProfessionalsCarousel professionals={professionals.data || []} />
      </div>
    </section>
  );
}
