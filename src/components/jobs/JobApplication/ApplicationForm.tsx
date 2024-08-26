import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import RichTextEditor from "@/components/RichTextEditor";
import LoadingButton from "@/components/LoadingButton";
import { draftToMarkdown } from "markdown-draft-js";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { applyJobSchema, ApplyJobValues } from "@/lib/validation";
import { objectToFormData } from "@/lib/form-data";
import { applyToJob } from "@/actions/jobs";
import { Applicant, Employer, Job, User } from "@prisma/client";

interface ApplicationFormProps {
  job: Job & { employer: Employer };
  user: User;
  applicant: Applicant;
}

export default function ApplicationForm({
  job: { id: jobId, slug: jobSlug },
  user,
  user: { role: userRole },
  applicant,
  applicant: { id: applicantId },
}: ApplicationFormProps) {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<ApplyJobValues>({
    resolver: zodResolver(applyJobSchema),
    defaultValues: { pitch: "" },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: ApplyJobValues) {
    if (!applicant) {
      toast({
        title: "Applicant profile missing.",
      });
    }
    if (!jobId) {
      toast({
        title: "Job info missing",
      });
    }

    if (applicant && user && jobId) {
      const formData = objectToFormData(values);
      const createdJob = await applyToJob(
        applicantId,
        jobId,
        formData,
        userRole,
        jobSlug,
      );
      if (createdJob) {
        router.push(`/jobs/${jobSlug}/submitted`);
        toast({
          title: "Your job application was successfully submitted",
        });
      }
    }
  }

  return (
    <Form {...form}>
      <form className="space-y-4" noValidate onSubmit={handleSubmit(onSubmit)}>
        <FormField
          control={control}
          name="pitch"
          render={({ field: { value, onChange, ref } }) => (
            <FormItem>
              <h5 className="text-lg font-semibold">Pitch</h5>
              <div className="text-md text-muted-foreground">
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
        <div className="flex justify-end">
          <LoadingButton
            type="submit"
            loading={isSubmitting}
            className="bg-[#3366FF] hover:bg-[#3366FF]"
          >
            Submit application
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}
