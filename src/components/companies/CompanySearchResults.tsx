import { searchCompanies } from "@/actions/companies";
import CompanySearchResultItem from "@/components/companies/CompanySearchResultItem";
import { CompanyFilterValues } from "@/lib/validation";
import { Employer } from "@prisma/client";
import Link from "next/link";

interface CompanySearchResultsProps {
  filterValues: CompanyFilterValues;
} 

export default async function CompanySearchResults({
  filterValues,
}: CompanySearchResultsProps) {
  const { q } = filterValues;

  const companies = await searchCompanies(q || "");

  return (
    <div className="flex flex-col space-y-4">
      {companies.map((company: Employer) => (
        <Link href={`/companies/${company.id}`} key={company.id}>
          <CompanySearchResultItem company={company} />
        </Link>
      ))}
    </div>
  );
}
