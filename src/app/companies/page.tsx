import CompanyFilter from "@/components/companies/CompanyFilter";
import CompanyInitialList from "@/components/companies/CompanyInitialList";
import CompanySearchTip from "@/components/companies/CompanySearchTip";

export default function Page() {
  return (
    <main className="m-auto mb-10 max-w-5xl space-y-6">
      <CompanyFilter />
      <CompanyInitialList />
      <CompanySearchTip />
    </main>
  );
}
