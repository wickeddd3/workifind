"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/shared/ui/form";
import RichTextEditor from "@/shared/ui/RichTextEditor";
import { LoadingButton } from "@/shared/ui/LoadingButton";
import { draftToMarkdown } from "markdown-draft-js";
import { useRouter } from "next/navigation";
import { useToast } from "@/shared/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  JobApplicationSchema,
  JobApplicationSchemaType,
} from "../model/schema";
import { applyToJob } from "../model/apply-to-job";

export function ApplicationForm({
  userId,
  applicantId,
  jobId,
  jobSlug,
}: {
  userId: string;
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
    const createdJob = await applyToJob(userId, applicantId, jobId, values);
    if (createdJob) {
      router.push(`/jobs/${jobSlug}/submitted`);
      router.refresh();
      toast({
        title: "Your job application was successfully submitted",
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
              <h5 className="text-md font-bold text-gray-900 md:text-lg">
                Pitch
              </h5>
              <div className="text-sm text-gray-700 md:text-md">
                Introduce yourself and briefly explain why you are suitable for
                this role. Consider your relevant skills, qualifications and
                related experience.
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
