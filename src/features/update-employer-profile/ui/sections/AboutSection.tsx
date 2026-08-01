"use client";

import type { Employer } from "@/entities/employer";
import { Form } from "@/shared/ui/form";
import { RichTextField } from "@/shared/ui/form-fields/RichEditorTextField";
import { ProfileSectionCard } from "@/shared/ui/profile/ProfileSectionCard";

import {
  EmployerAboutSchema,
  type EmployerAboutSchemaType,
} from "../../model/schema";
import { useEmployerSection } from "../use-employer-section";

export function AboutSection({ employer }: { employer: Employer }) {
  const { form, onSubmit, isDirty, isSubmitting, justSaved } =
    useEmployerSection<EmployerAboutSchemaType>({
      section: "about",
      schema: EmployerAboutSchema,
      defaultValues: { about: employer.about ?? "" },
    });

  return (
    <ProfileSectionCard
      id="about"
      title="About us"
      description="What the company does, and who works there."
      isDirty={isDirty}
      isSubmitting={isSubmitting}
      justSaved={justSaved}
      onSubmit={onSubmit}
    >
      <Form {...form}>
        <RichTextField control={form.control} name="about" label="About us" />
      </Form>
    </ProfileSectionCard>
  );
}
