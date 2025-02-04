import CompanySearchResultItem from "@/components/companies/CompanySearchResultItem";
import { Employer, Job } from "@prisma/client";
import Link from "next/link";

interface CompanySearchResultsProps {
  companies: (Employer & { jobs: Job[] })[];
}

export default async function CompanySearchResults({
  companies,
}: CompanySearchResultsProps) {
  return (
    <div className="flex h-full w-full flex-col gap-4">
      {companies.map((company) => (
        <Link href={`/companies/${company.slug}`} key={company.slug}>
          <CompanySearchResultItem company={company} />
        </Link>
      ))}
    </div>
  );
}
