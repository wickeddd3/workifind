"use client";

import { useFieldArray } from "react-hook-form";

import {
  type ApplicantProfile,
  EMPTY_LANGUAGE_ENTRY,
  LanguageEntryFields,
  toLanguageEntries,
} from "@/entities/applicant/client";
import { Form } from "@/shared/ui/form";
import { RepeatableFieldset } from "@/shared/ui/form-fields/RepeatableFieldset";
import { ProfileSectionCard } from "@/shared/ui/profile/ProfileSectionCard";

import {
  ApplicantLanguagesSchema,
  type ApplicantLanguagesSchemaType,
} from "../../model/schema";
import { useProfileSection } from "../use-profile-section";

export function LanguagesSection({
  applicant,
}: {
  applicant: ApplicantProfile;
}) {
  const { form, onSubmit, isDirty, isSubmitting, justSaved } =
    useProfileSection<ApplicantLanguagesSchemaType>({
      section: "languages",
      schema: ApplicantLanguagesSchema,
      defaultValues: { languages: toLanguageEntries(applicant.languages) },
    });

  const { fields, append, remove } = useFieldArray<
    ApplicantLanguagesSchemaType,
    "languages"
  >({ control: form.control, name: "languages" });

  return (
    <ProfileSectionCard
      id="languages"
      title="Languages"
      description="Languages you can work in, and how well."
      isDirty={isDirty}
      isSubmitting={isSubmitting}
      justSaved={justSaved}
      onSubmit={onSubmit}
    >
      <Form {...form}>
        <RepeatableFieldset
          variant="row"
          itemLabel="language"
          emptyPrompt="No languages listed yet."
          fields={fields}
          onAdd={() => append(EMPTY_LANGUAGE_ENTRY)}
          onRemove={(index) => remove(index)}
        >
          {(index) => (
            <LanguageEntryFields control={form.control} index={index} />
          )}
        </RepeatableFieldset>
      </Form>
    </ProfileSectionCard>
  );
}
