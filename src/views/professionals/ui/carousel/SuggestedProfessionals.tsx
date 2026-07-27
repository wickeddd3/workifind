import { getSuggestedProfessionalsQuery } from "../api/professional.queries";
import { ProfessionalsCarousel } from "./ProfessionalsCarousel";

export async function SuggestedProfessionals() {
  const professionals = await getSuggestedProfessionalsQuery({ size: 8 });

  return (
    <section className="flex flex-col space-y-2 py-6">
      <h2 className="text-md font-semibold text-gray-900 md:text-lg lg:text-xl">
        Explore professionals
      </h2>
      <p className="text-sm font-normal text-gray-600 md:text-md">
        Discover skilled professionals ready for their next role.
      </p>
      <div className="flex py-4">
        <ProfessionalsCarousel professionals={professionals.data || []} />
      </div>
    </section>
  );
}
