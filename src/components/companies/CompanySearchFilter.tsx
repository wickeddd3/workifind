import { redirect } from "next/navigation";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { companyFilterSchema, CompanyFilterValues } from "@/lib/validation";

async function searchCompanies(formData: FormData) {
  "use server";

  const values = Object.fromEntries(formData.entries());
  const { q } = companyFilterSchema.parse(values);
  const searchParams = new URLSearchParams({ ...(q && { q: q.trim() }) });

  redirect(`/companies/search?${searchParams.toString()}`);
}

interface CompanySearchFilterProps {
  filterValues: CompanyFilterValues;
}

export default function CompanySearchFilter({
  filterValues,
}: CompanySearchFilterProps) {
  const { q } = filterValues;

  return (
    <section className="flex flex-col space-y-8 py-6">
      <h1 className="text-3xl font-medium">
        Search results for &quot;{q}&ldquo;
      </h1>
      <form
        action={searchCompanies}
        key="company-search-filter"
        className="flex w-full gap-2"
      >
        <Input
          id="q"
          name="q"
          type="text"
          placeholder="Search by company name"
          className="w-full"
          defaultValue={q}
        />
        <Button>Search</Button>
      </form>
    </section>
  );
}
