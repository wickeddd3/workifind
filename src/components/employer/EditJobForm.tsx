"use client";

import { Form, FormLabel } from "@/components/ui/form";
import { TextInputField } from "@/components/common/TextInputField";
import { SelectField } from "@/components/common/SelectField";
import { RichTextField } from "@/components/common/RichEditorTextField";
import LoadingButton from "@/components/LoadingButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EMPLOYMENT_TYPES, LOCATION_TYPES } from "@/constants/tags";
import { Job } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { JobSchema, JobSchemaType } from "@/schema/job";
import { updateJob } from "@/app/_services/employer-jobs";

interface NewJobFormProps {
  userId: string;
  jobId: number;
  job: Job;
}

export default function EditJobForm({
  userId,
  jobId,
  job: {
    title,
    employmentType,
    description,
    minSalary,
    maxSalary,
    location,
    locationType,
  },
}: NewJobFormProps) {
  const router = useRouter();
  const { toast } = useToast();

  const defaultValues: JobSchemaType = {
    title,
    employmentType,
    locationType,
    description: description ?? "",
    minSalary: minSalary ?? "",
    maxSalary: maxSalary ?? "",
    location: location ?? "",
  };

  const form = useForm<JobSchemaType>({
    resolver: zodResolver(JobSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: JobSchemaType) {
    const updatedJob = await updateJob(userId, jobId, values);
    if (updatedJob) {
      router.push("/employer/jobs");
      router.refresh();
      toast({
        title: "Job was successfully updated.",
      });
    }
  }

  return (
    <main className="m-auto space-y-6 px-4">
      <div>
        <h1 className="text-md font-semibold">{`Edit ${title} job post`}</h1>
        <p className="text-sm text-muted-foreground">
          Get your job posting seen by thousands of job seekers.
        </p>
      </div>
      <div className="space-y-6 rounded-lg border p-4">
        <div>
          <h2 className="font-semibold">Job details</h2>
          <p className="text-muted-foreground">
            Provide a job description and details
          </p>
        </div>
        <Form {...form}>
          <form
            className="space-y-4"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextInputField
              control={control}
              name="title"
              label="Job Title"
              placeholder="e.g. Frontend Developer"
            />
            <SelectField
              control={control}
              name="employmentType"
              label="Employment Type"
              options={EMPLOYMENT_TYPES}
            />
            <SelectField
              control={control}
              name="locationType"
              label="Work Setup"
              options={LOCATION_TYPES}
            />
            <TextInputField
              control={control}
              name="location"
              label="Office Location"
            />
            <RichTextField
              control={control}
              name="description"
              label="Description"
            />
            <div className="flex flex-col space-y-4">
              <FormLabel>Salary range</FormLabel>
              <div className="flex justify-between space-x-4">
                <TextInputField
                  control={control}
                  type="number"
                  name="minSalary"
                  label="Minimum Salary"
                />
                <TextInputField
                  control={control}
                  type="number"
                  name="maxSalary"
                  label="Maximum Salary"
                />
              </div>
            </div>
            <LoadingButton type="submit" loading={isSubmitting}>
              Update job post
            </LoadingButton>
          </form>
        </Form>
      </div>
    </main>
  );
}
