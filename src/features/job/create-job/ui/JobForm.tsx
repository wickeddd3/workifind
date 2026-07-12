"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { EMPLOYMENT_TYPES, LOCATION_TYPES } from "@/shared/constants/tags";
import { Button } from "@/shared/ui/button";
import { Form, FormLabel } from "@/shared/ui/form";
import { RichTextField } from "@/shared/ui/form-fields/RichEditorTextField";
import { SelectField } from "@/shared/ui/form-fields/SelectField";
import { TextInputField } from "@/shared/ui/form-fields/TextInputField";
import { LoadingButton } from "@/shared/ui/LoadingButton";
import { useToast } from "@/shared/ui/use-toast";

import { createJobAction } from "../api/job.action";
import { JobSchema, type JobSchemaType } from "../model/schema";

export function JobForm({ employerId }: { employerId: number }) {
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
    const response = await createJobAction(employerId, values);
    if (response.success) {
      router.push("/employer/jobs");
      router.refresh();
      toast({
        title: "Your job post is now live",
      });
    }
  }

  return (
    <div className="m-auto my-6 max-w-3xl space-y-6 px-4">
      <div className="flex flex-col gap-1 px-1">
        <h1 className="text-xl font-bold text-gray-900">Post a new job</h1>
        <p className="text-sm text-muted-foreground">
          Get your role in front of thousands of job seekers.
        </p>
      </div>
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-card md:p-8">
        <Form {...form}>
          <form
            className="space-y-5"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextInputField
              control={control}
              name="title"
              label="Job title"
              placeholder="e.g. Frontend Developer"
            />
            <SelectField
              control={control}
              name="employmentType"
              label="Employment type"
              options={EMPLOYMENT_TYPES}
            />
            <SelectField
              control={control}
              name="locationType"
              label="Work setup"
              options={LOCATION_TYPES}
            />
            <TextInputField
              control={control}
              name="location"
              label="Office location"
            />
            <RichTextField
              control={control}
              name="description"
              label="Description"
            />
            <div className="flex flex-col space-y-4">
              <FormLabel>Salary range</FormLabel>
              <div className="flex flex-col gap-4 sm:flex-row sm:gap-4">
                <TextInputField
                  control={control}
                  type="number"
                  name="minSalary"
                  label="Minimum salary"
                />
                <TextInputField
                  control={control}
                  type="number"
                  name="maxSalary"
                  label="Maximum salary"
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-5">
              <Button asChild variant="ghost">
                <Link href="/employer/jobs">Cancel</Link>
              </Button>
              <LoadingButton type="submit" loading={isSubmitting}>
                Publish job
              </LoadingButton>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
