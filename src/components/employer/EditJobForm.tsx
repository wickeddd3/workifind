"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SimpleSelect from "@/components/ui/simple-select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EMPLOYMENT_TYPES, LOCATION_TYPES } from "@/constants/tags";
import { Label } from "@/components/ui/label";
import RichTextEditor from "@/components/RichTextEditor";
import { draftToMarkdown } from "markdown-draft-js";
import LoadingButton from "@/components/LoadingButton";
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
    trigger,
    control,
    setFocus,
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
            <FormField
              control={control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Frontend Developer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="employmentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employment type</FormLabel>
                  <FormControl>
                    <SimpleSelect {...field}>
                      <option value="" hidden>
                        Select an option
                      </option>
                      {EMPLOYMENT_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </SimpleSelect>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="locationType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Work setup</FormLabel>
                  <FormControl>
                    <SimpleSelect
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        if (e.currentTarget.value === "Remote") {
                          trigger("location");
                        }
                      }}
                    >
                      <option value="" hidden>
                        Select an option
                      </option>
                      {LOCATION_TYPES.map((locationType) => (
                        <option key={locationType} value={locationType}>
                          {locationType}
                        </option>
                      ))}
                    </SimpleSelect>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Office location</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="description"
              render={({ field: { value, onChange, ref } }) => (
                <FormItem>
                  <Label onClick={() => setFocus("description")}>
                    Description
                  </Label>
                  <FormControl>
                    <RichTextEditor
                      initialState={value}
                      onChange={(draft) => onChange(draftToMarkdown(draft))}
                      ref={ref}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col space-y-4">
              <FormLabel>Salary range</FormLabel>
              <div className="flex justify-between space-x-4">
                <FormField
                  control={control}
                  name="minSalary"
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormLabel>Minimum salary</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="maxSalary"
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormLabel>Maximum salary</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
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
