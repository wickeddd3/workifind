"use client";

import { useCallback, useEffect, useState } from "react";
import { Applicant, Employer, Job } from "@prisma/client";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import RichTextEditor from "../RichTextEditor";
import LoadingButton from "../LoadingButton";
import { draftToMarkdown } from "markdown-draft-js";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { applyJobSchema, ApplyJobValues } from "@/lib/validation";
import { objectToFormData } from "@/lib/form-data";
import { applyToJob } from "@/actions/jobs";
import { useUser } from "@/contexts/UserContext";
import { getApplicant } from "@/actions/applicants";
import { BadgeCheck, Briefcase, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { noCompanyLogo } from "@/lib/logo";

interface JobApplicationFormProps {
  job: Job & { employer: Employer };
}

export default function JobApplicationForm({
  job: {
    id,
    slug,
    title,
    employer: { companyName, companyLogoUrl },
  },
}: JobApplicationFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useUser();

  const [applicant, setApplicant] = useState<Applicant | null>(null);

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
    if (!id) {
      toast({
        title: "Job info missing",
      });
    }

    if (applicant && user && id) {
      const formData = objectToFormData(values);
      const createdJob = await applyToJob(
        applicant.id,
        id,
        formData,
        user.role,
        slug,
      );
      if (createdJob) {
        router.push(`/jobs/${slug}/submitted`);
        toast({
          title: "Your job application was successfully submitted",
        });
      }
    }
  }

  const handleGetApplicant = useCallback(
    async (id: number) => await getApplicant(id),
    [],
  );

  useEffect(() => {
    if (user && user?.id) {
      handleGetApplicant(user.id).then(setApplicant);
    }
  }, [user, handleGetApplicant]);

  return (
    <section className="w-full grow space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {companyName && (
          <div className="rounded-xl border-2 border-gray-200">
            <Image
              src={companyLogoUrl || noCompanyLogo}
              alt={`${companyName} logo`}
              width={140}
              height={140}
              className="rounded-xl"
            />
          </div>
        )}
        <div className="flex flex-col gap-2">
          <h6 className="sm:text-md text-sm font-normal text-muted-foreground">
            Applying for
          </h6>
          <h1 className="text-xl font-semibold text-gray-900 sm:text-3xl">
            {title}
          </h1>
          <h1 className="text-md font-normal text-gray-800 sm:text-xl">
            {companyName}
          </h1>
          <Link href={`/jobs/${slug}`}>
            <h6 className="text-sm font-medium underline">
              View job description
            </h6>
          </Link>
        </div>
      </div>
      {applicant && (
        <div className="flex flex-col space-y-1 rounded-xl bg-gray-50 bg-custom-job-filter-svg bg-cover bg-center bg-no-repeat p-8">
          <div className="flex w-fit items-center justify-between gap-4">
            <h2 className="text-xl font-semibold sm:text-3xl">{`${applicant?.firstName} ${applicant?.lastName}`}</h2>
            {applicant?.experienced && (
              <BadgeCheck size={16} className="shrink-0" />
            )}
          </div>
          {applicant?.profession && (
            <p className="flex items-center gap-1.5">
              <Briefcase size={18} color="#7b8993" className="shrink-0" />
              <span className="text-md font-medium text-gray-500">
                {applicant?.profession}
              </span>
            </p>
          )}
          {applicant?.email && (
            <p className="flex items-center gap-1.5">
              <Mail size={18} color="#7b8993" className="shrink-0" />
              <span className="text-md font-medium text-gray-500">
                {applicant?.email}
              </span>
            </p>
          )}
          {applicant?.location && (
            <p className="flex items-center gap-1.5">
              <MapPin size={18} color="#7b8993" className="shrink-0" />
              <span className="text-md font-medium text-gray-500">
                {applicant?.location}
              </span>
            </p>
          )}
          {applicant?.phoneNumber && (
            <p className="flex items-center gap-1.5">
              <Phone size={18} color="#7b8993" className="shrink-0" />
              <span className="text-md font-medium text-gray-500">
                {applicant?.phoneNumber}
              </span>
            </p>
          )}
        </div>
      )}
      <Form {...form}>
        <form
          className="space-y-4"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormField
            control={control}
            name="pitch"
            render={({ field: { value, onChange, ref } }) => (
              <FormItem>
                <h5 className="text-lg font-semibold">Pitch</h5>
                <div className="text-md text-muted-foreground">
                  Introduce yourself and briefly explain why you are suitable
                  for this role. Consider your relevant skills, qualifications
                  and related experience.
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
            <LoadingButton type="submit" loading={isSubmitting}>
              Submit application
            </LoadingButton>
          </div>
        </form>
      </Form>
    </section>
  );
}
