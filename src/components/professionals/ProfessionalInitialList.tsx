import { Applicant } from "@prisma/client";
import ProfessionalInitialListItem from "@/components/professionals/ProfessionalInitialListItem";

interface ProfessionalInitialListProps {
  professionals: Applicant[];
}

export default function ProfessionalInitialList({
  professionals,
}: ProfessionalInitialListProps) {
  return (
    <section className="flex flex-col space-y-2 py-6">
      <h1 className="text-2xl font-semibold text-gray-900">
        Explore professionals
      </h1>
      <h5 className="text-lg font-normal text-gray-700">
        Learn about new jobs and company culture.
      </h5>
      <div className="flex py-4">
        {professionals.map((professional) => (
          <ProfessionalInitialListItem
            professional={professional}
            key={professional.id}
          />
        ))}
      </div>
    </section>
  );
}
