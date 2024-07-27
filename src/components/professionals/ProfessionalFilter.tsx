import IconSearch from "@/components/icons/IconSearch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { professionalFilterSchema } from "@/lib/validation";

async function searchProfessionals(formData: FormData) {
  "use server";

  const values = Object.fromEntries(formData.entries());
  const { q } = professionalFilterSchema.parse(values);
  const searchParams = new URLSearchParams({ ...(q && { q: q.trim() }) });

  redirect(`/professionals/search?${searchParams.toString()}`);
}

export default function ProfessionalFilter() {
  return (
    <section className="flex min-h-[340px] items-center justify-between rounded-2xl bg-gray-50 px-8 py-12">
      <div className="flex w-full grow flex-col space-y-4">
        <h1 className="text-4xl font-semibold text-gray-900">
          Find your next potential employee
        </h1>
        <h5 className="text-xl font-medium text-gray-700">
          Explore list of professionals you can hire
        </h5>
        <form
          action={searchProfessionals}
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
          <Button className="bg-[#3366FF] hover:bg-[#254EDB]">Search</Button>
        </form>
      </div>
      <div className="flex flex-none items-center justify-center px-14">
        <div className="relative flex items-center justify-center">
          <div className="absolute h-[180px] w-[180px] rounded-full bg-white shadow-md"></div>
          <IconSearch width={240} height={240} className="z-10" />
        </div>
      </div>
    </section>
  );
}
