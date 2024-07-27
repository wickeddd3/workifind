import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Select from "@/components/ui/select";
import { jobSalary, locationTypes, employmentTypes } from "@/lib/job-types";
import { jobFilterSchema, JobFilterValues } from "@/lib/validation";
import { redirect } from "next/navigation";

async function filterJobs(formData: FormData) {
  "use server";

  const values = Object.fromEntries(formData.entries());
  const { q, employmentType, salary, locationType } =
    jobFilterSchema.parse(values);
  const searchParams = new URLSearchParams({
    ...(q && { q: q.trim() }),
    ...(employmentType && { employmentType }),
    ...(salary && { salary }),
    ...(locationType && { locationType }),
  });

  redirect(`/jobs?${searchParams.toString()}`);
}

interface JobFilterProps {
  defaultValues: JobFilterValues;
}

export default function JobFilter({ defaultValues }: JobFilterProps) {
  return (
    <aside className="bg-custom-job-filter-svg bg-gray-50 bg-cover bg-center bg-no-repeat px-3 py-14 md:w-full">
      <div className="mx-auto max-w-4xl">
        <form
          action={filterJobs}
          key={JSON.stringify(defaultValues)}
          className="w-full"
        >
          <div className="w-full space-y-4">
            <div className="flex w-full gap-2">
              <Input
                id="q"
                name="q"
                placeholder="Search by job title"
                className="text-md w-full px-4 py-6"
                defaultValue={defaultValues.q}
              />
              <Button className="size-30 bg-[#3366FF] text-sm font-semibold tracking-wider hover:bg-[#254EDB]">
                Search
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Select
                id="employmentType"
                name="employmentType"
                className="text-md h-12 w-full rounded-full px-4 md:w-[200px]"
                defaultValue={defaultValues.employmentType || ""}
              >
                <option value="">Job types</option>
                {employmentTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Select>
              <Select
                id="salary"
                name="salary"
                className="text-md h-12 w-full rounded-full px-4 md:w-[200px]"
                defaultValue={defaultValues.salary || ""}
              >
                <option value="">Job salary</option>
                {jobSalary.map((salary) => (
                  <option key={salary.value} value={salary.value}>
                    {salary.name}
                  </option>
                ))}
              </Select>
              <Select
                id="locationType"
                name="locationType"
                className="text-md h-12 w-full rounded-full px-4 md:w-[200px]"
                defaultValue={defaultValues.locationType || ""}
              >
                <option value="">Location type</option>
                {locationTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </form>
      </div>
    </aside>
  );
}
