import { searchCompanies } from "@/actions/companies";
import CompanySearchResultItem from "@/components/companies/CompanySearchResultItem";
import { CompanyFilterValues } from "@/lib/validation";
import { Employer } from "@prisma/client";

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
        <CompanySearchResultItem company={company} key={company.id} />
      ))}
    </div>
  );
}
