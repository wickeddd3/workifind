import ProfessionalSearchResultItem from "@/components/professionals/ProfessionalSearchResultItem";
import { Applicant } from "@prisma/client";
import Link from "next/link";

interface ProfessionalSearchResultsProps {
  professionals: Applicant[];
}

export default async function ProfessionalSearchResults({
  professionals,
}: ProfessionalSearchResultsProps) {
  return (
    <div className="flex h-full w-full flex-col gap-4">
      {professionals.map((professional: Applicant) => (
        <Link href={`/professionals/${professional.id}`} key={professional.id}>
          <ProfessionalSearchResultItem professional={professional} />
        </Link>
      ))}
    </div>
  );
}
