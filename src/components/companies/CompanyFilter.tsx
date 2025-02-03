import IconSearch from "@/components/icons/IconSearch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { CompanyFilterSchema } from "@/schema/company-filter";

async function searchCompanies(formData: FormData) {
  "use server";

  const values = Object.fromEntries(formData.entries());
  const { q } = CompanyFilterSchema.parse(values);
  const searchParams = new URLSearchParams({ ...(q && { q: q.trim() }) });

  redirect(`/companies/search?${searchParams.toString()}`);
}

export default function CompanyFilter() {
  return (
    <section className="flex h-full w-full items-center justify-between rounded-2xl bg-gray-50 px-4 py-6 md:px-6 md:py-8 lg:px-8 lg:py-10">
      <div className="flex w-full grow flex-col space-y-4">
        <h1 className="text-balance text-xl font-semibold text-gray-900 md:text-2xl lg:text-3xl">
          Find your next potential company
        </h1>
        <h5 className="text-balance text-md font-medium text-gray-700 md:text-lg lg:text-xl">
          Explore list of companies you can apply with
        </h5>
        <form
          action={searchCompanies}
          key="company-filter"
          className="flex w-full gap-2"
        >
          <Input
            id="q"
            name="q"
            type="text"
            placeholder="Search by company name"
            className="w-full"
          />
          <Button className="bg-indigo-600 hover:bg-indigo-700">Search</Button>
        </form>
      </div>
      <div className="hidden items-center justify-center px-14 md:flex">
        <div className="relative flex items-center justify-center">
          <div className="absolute h-[180px] w-[180px] rounded-full bg-white shadow-md"></div>
          <IconSearch width={240} height={240} className="z-10" />
        </div>
      </div>
    </section>
  );
}
