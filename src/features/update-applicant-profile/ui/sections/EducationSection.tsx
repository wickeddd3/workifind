"use client";

import { useFieldArray } from "react-hook-form";

import {
  type ApplicantProfile,
  EducationEntryFields,
  EMPTY_EDUCATION_ENTRY,
  toEducationEntries,
} from "@/entities/applicant/client";
import { Form } from "@/shared/ui/form";
import { RepeatableFieldset } from "@/shared/ui/form-fields/RepeatableFieldset";
import { ProfileSectionCard } from "@/shared/ui/profile/ProfileSectionCard";

import {
  ApplicantEducationSchema,
  type ApplicantEducationSchemaType,
} from "../../model/schema";
import { useProfileSection } from "../use-profile-section";

export function EducationSection({
  applicant,
}: {
  applicant: ApplicantProfile;
}) {
  const { form, onSubmit, isDirty, isSubmitting, justSaved } =
    useProfileSection<ApplicantEducationSchemaType>({
      section: "education",
      schema: ApplicantEducationSchema,
      defaultValues: { educations: toEducationEntries(applicant.educations) },
    });

  const { fields, append, remove } = useFieldArray<
    ApplicantEducationSchemaType,
    "educations"
  >({ control: form.control, name: "educations" });

  const educations = form.watch("educations");

  return (
    <ProfileSectionCard
      id="education"
      title="Education"
      description="Where you studied. Only the school is required — dates are optional."
      isDirty={isDirty}
      isSubmitting={isSubmitting}
      justSaved={justSaved}
      onSubmit={onSubmit}
    >
      <Form {...form}>
        <RepeatableFieldset
          itemLabel="qualification"
          emptyPrompt="No education listed yet."
          fields={fields}
          onAdd={() => append(EMPTY_EDUCATION_ENTRY)}
          onRemove={(index) => remove(index)}
        >
          {(index) => (
            <EducationEntryFields
              control={form.control}
              index={index}
              isCurrent={educations?.[index]?.current}
            />
          )}
        </RepeatableFieldset>
      </Form>
    </ProfileSectionCard>
  );
}
