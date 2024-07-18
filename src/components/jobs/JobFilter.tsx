import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Select from "@/components/ui/select";
import { jobSalary, locationTypes, employmentTypes } from "@/lib/job-types";
import { jobFilterSchema, JobFilterValues } from "@/lib/validation";
import { redirect } from "next/navigation";

async function filterJobs(formData: FormData) {
  "use server";

  const values = Object.fromEntries(formData.entries());
  const { q, type, salary, setup } = jobFilterSchema.parse(values);
  const searchParams = new URLSearchParams({
    ...(q && { q: q.trim() }),
    ...(type && { type }),
    ...(salary && { salary }),
    ...(setup && { setup }),
  });

  redirect(`/jobs?${searchParams.toString()}`);
}

interface JobFilterProps {
  defaultValues: JobFilterValues;
}

export default function JobFilter({ defaultValues }: JobFilterProps) {
  return (
    <aside className="bg-gray-50 px-3 py-10 md:w-full">
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
                placeholder="Title, company, etc."
                className="w-full"
                defaultValue={defaultValues.q}
              />
              <Button>Search</Button>
            </div>
            <div className="flex items-center space-x-2">
              <Select
                id="type"
                name="type"
                className="rounded-full md:w-[200px]"
                defaultValue={defaultValues.type || ""}
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
                className="rounded-full md:w-[200px]"
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
                id="setup"
                name="setup"
                className="rounded-full md:w-[200px]"
                defaultValue={defaultValues.setup || ""}
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
