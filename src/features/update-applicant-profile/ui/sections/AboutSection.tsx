"use client";

import type { Applicant } from "@/entities/applicant";
import { Form } from "@/shared/ui/form";
import { RichTextField } from "@/shared/ui/form-fields/RichEditorTextField";
import { ProfileSectionCard } from "@/shared/ui/profile/ProfileSectionCard";

import {
  ApplicantAboutSchema,
  type ApplicantAboutSchemaType,
} from "../../model/schema";
import { useProfileSection } from "../use-profile-section";

export function AboutSection({ applicant }: { applicant: Applicant }) {
  const { form, onSubmit, isDirty, isSubmitting, justSaved } =
    useProfileSection<ApplicantAboutSchemaType>({
      section: "about",
      schema: ApplicantAboutSchema,
      defaultValues: { about: applicant.about ?? "" },
    });

  return (
    <ProfileSectionCard
      id="about"
      title="About me"
      description="A short introduction employers read before your skills."
      isDirty={isDirty}
      isSubmitting={isSubmitting}
      justSaved={justSaved}
      onSubmit={onSubmit}
    >
      <Form {...form}>
        <RichTextField control={form.control} name="about" label="About me" />
      </Form>
    </ProfileSectionCard>
  );
}
