"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { draftToMarkdown } from "markdown-draft-js";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import {
  getResumeFileError,
  RESUME_ACCEPT,
  RESUME_MAX_SIZE_LABEL,
  RESUME_UPLOAD_ENDPOINT,
  type ResumeSummary,
} from "@/entities/applicant/client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/shared/ui/form";
import { UploadField } from "@/shared/ui/form-fields/UploadField";
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
  profileResume,
}: {
  applicantId: string;
  jobId: string;
  jobSlug: string;
  /**
   * The résumé on the profile, which is what gets sent when nothing is
   * attached here. A summary rather than the record — this is a client
   * component, and the blob URL must not be serialized into the page.
   */
  profileResume: ResumeSummary | null;
}) {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<JobApplicationSchemaType>({
    resolver: zodResolver(JobApplicationSchema),
    defaultValues: { pitch: "", resumeToken: undefined },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: JobApplicationSchemaType) {
    const response = await saveJobApplicationAction(applicantId, jobId, values);

    if (!response.success) {
      // A failed submit used to do nothing at all — no toast, no message, the
      // form simply sat there. With a file in the mix that is worse: the most
      // likely failure is the upload, and it is the one thing the applicant
      // could act on.
      toast({
        variant: "destructive",
        title: "Couldn't send your application",
        description: response.message,
      });
      return;
    }

    router.push(`/jobs/${jobSlug}/submitted`);
    router.refresh();
    toast({
      title: "Your application is on its way",
    });
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
              <h3 className="text-md font-bold text-foreground md:text-lg">
                Why you&apos;re a great fit
              </h3>
              <div className="text-sm text-muted-foreground md:text-md">
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
        <div className="flex flex-col gap-2 border-t border-border pt-4">
          <h3 className="text-md font-bold text-foreground md:text-lg">
            Résumé
          </h3>
          <p className="text-sm text-muted-foreground md:text-md">
            {profileResume
              ? `${profileResume.name} goes with this application. Attach a different file below to send that instead — your profile keeps the one it has.`
              : "You have no résumé on your profile. Attach one here to send it with this application."}
          </p>
          <UploadField
            control={control}
            name="resumeToken"
            label={profileResume ? "Send a different file" : "Attach a résumé"}
            endpoint={RESUME_UPLOAD_ENDPOINT}
            accept={RESUME_ACCEPT}
            validate={getResumeFileError}
            description={`Optional. PDF, DOC or DOCX, up to ${RESUME_MAX_SIZE_LABEL}. It is sent when you submit.`}
          />
        </div>

        <div className="flex w-full justify-end">
          <LoadingButton type="submit" loading={isSubmitting} className="w-fit">
            Submit application
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}
