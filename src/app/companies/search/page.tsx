import CompanySearchFilter from "@/components/companies/CompanySearchFilter";
import CompanySearchResults from "@/components/companies/CompanySearchResults";

export default function Page() {
  return (
    <main className="m-auto mb-10 max-w-2xl space-y-6">
      <CompanySearchFilter />
      <CompanySearchResults />
    </main>
  );
}
