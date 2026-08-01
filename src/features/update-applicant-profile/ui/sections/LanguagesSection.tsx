"use client";

import { useFieldArray } from "react-hook-form";

import type { Applicant } from "@/entities/applicant";
import { Form } from "@/shared/ui/form";
import { DynamicListField } from "@/shared/ui/form-fields/DynamicListField";
import { ProfileSectionCard } from "@/shared/ui/profile/ProfileSectionCard";

import {
  ApplicantLanguagesSchema,
  type ApplicantLanguagesSchemaType,
} from "../../model/schema";
import { useProfileSection } from "../use-profile-section";

export function LanguagesSection({ applicant }: { applicant: Applicant }) {
  const { form, onSubmit, isDirty, isSubmitting, justSaved } =
    useProfileSection<ApplicantLanguagesSchemaType>({
      section: "languages",
      schema: ApplicantLanguagesSchema,
      defaultValues: { languages: applicant.languages ?? [] },
    });

  const { fields, append, remove } = useFieldArray<
    ApplicantLanguagesSchemaType,
    "languages"
  >({ control: form.control, name: "languages" });

  return (
    <ProfileSectionCard
      id="languages"
      title="Languages"
      description="Languages you can work in."
      isDirty={isDirty}
      isSubmitting={isSubmitting}
      justSaved={justSaved}
      onSubmit={onSubmit}
    >
      <Form {...form}>
        <DynamicListField
          control={form.control}
          name="languages"
          label="Languages"
          fields={fields}
          append={() => append({ name: "" })}
          remove={(index) => remove(index)}
        />
      </Form>
    </ProfileSectionCard>
  );
}
