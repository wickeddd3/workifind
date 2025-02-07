"use client";

import { Form, FormLabel } from "@/components/ui/form";
import { TextInputField } from "@/components/common/TextInputField";
import { SelectField } from "@/components/common/SelectField";
import { RichTextField } from "@/components/common/RichEditorTextField";
import LoadingButton from "@/components/LoadingButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EMPLOYMENT_TYPES, LOCATION_TYPES } from "@/constants/tags";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { JobSchema, JobSchemaType } from "@/schema/job";
import { createJob } from "@/app/_services/employer-jobs";

interface NewJobFormProps {
  userId: string;
}

export default function NewJobForm({ userId }: NewJobFormProps) {
  const router = useRouter();
  const { toast } = useToast();

  const defaultValues: JobSchemaType = {
    title: "",
    employmentType: "",
    description: "",
    minSalary: "",
    maxSalary: "",
    location: "",
    locationType: "",
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
    const createdJob = await createJob(userId, values);
    if (createdJob) {
      router.push("/employer/jobs");
      router.refresh();
      toast({
        title: "New job was successfully created.",
      });
    }
  }

  return (
    <main className="m-auto space-y-6 px-4">
      <div>
        <h1 className="text-md font-semibold">Create a new job post</h1>
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
              Create job post
            </LoadingButton>
          </form>
        </Form>
      </div>
    </main>
  );
}
