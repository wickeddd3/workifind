import { searchProfessionals } from "@/actions/professionals";
import ProfessionalSearchResultItem from "@/components/professionals/ProfessionalSearchResultItem";
import { ProfessionalFilterValues } from "@/lib/validation";
import { Applicant } from "@prisma/client";
import Link from "next/link";

interface ProfessionalSearchResultsProps {
  filterValues: ProfessionalFilterValues;
}

export default async function ProfessionalSearchResults({
  filterValues,
}: ProfessionalSearchResultsProps) {
  const { q } = filterValues;

  const professionals = await searchProfessionals(q || "");

  return (
    <div className="flex flex-col space-y-4">
      {professionals.map((professional: Applicant) => (
        <Link href={`/professionals/${professional.id}`} key={professional.id}>
          <ProfessionalSearchResultItem professional={professional} />
        </Link>
      ))}
    </div>
  );
}
