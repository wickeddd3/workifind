"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { draftToMarkdown } from "markdown-draft-js";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/shared/ui/form";
import { LoadingButton } from "@/shared/ui/LoadingButton";
import RichTextEditor from "@/shared/ui/RichTextEditor";
import { useToast } from "@/shared/ui/use-toast";

import { saveJobApplicationAction } from "../api/job-application.action";
import {
  JobApplicationSchema,
  type JobApplicationSchemaType,
} from "../model/schema";

export function ApplicationForm({
  applicantId,
  jobId,
  jobSlug,
}: {
  applicantId: number;
  jobId: number;
  jobSlug: string;
}) {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<JobApplicationSchemaType>({
    resolver: zodResolver(JobApplicationSchema),
    defaultValues: { pitch: "" },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: JobApplicationSchemaType) {
    const response = await saveJobApplicationAction(applicantId, jobId, values);

    if (response.success) {
      router.push(`/jobs/${jobSlug}/submitted`);
      router.refresh();
      toast({
        title: "Your application is on its way",
      });
    }
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormField
          control={control}
          name="pitch"
          render={({ field: { value, onChange, ref } }) => (
            <FormItem>
              <h3 className="text-md font-bold text-gray-900 md:text-lg">
                Why you&apos;re a great fit
              </h3>
              <div className="text-sm text-gray-600 md:text-md">
                Introduce yourself and share why this role is right for you —
                highlight the skills, qualifications, and experience that make
                you stand out.
              </div>
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
        <div className="flex w-full justify-end">
          <LoadingButton
            type="submit"
            loading={isSubmitting}
            className="w-fit bg-indigo-600 hover:bg-indigo-700"
          >
            Submit application
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}
