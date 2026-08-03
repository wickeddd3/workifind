"use client";

import { useFieldArray } from "react-hook-form";

import {
  type ApplicantProfile,
  EMPTY_EXPERIENCE_ENTRY,
  ExperienceEntryFields,
  toExperienceEntries,
} from "@/entities/applicant/client";
import { Form } from "@/shared/ui/form";
import { RepeatableFieldset } from "@/shared/ui/form-fields/RepeatableFieldset";
import { ProfileSectionCard } from "@/shared/ui/profile/ProfileSectionCard";

import {
  ApplicantExperienceSchema,
  type ApplicantExperienceSchemaType,
} from "../../model/schema";
import { useProfileSection } from "../use-profile-section";

export function ExperienceSection({
  applicant,
}: {
  applicant: ApplicantProfile;
}) {
  const { form, onSubmit, isDirty, isSubmitting, justSaved } =
    useProfileSection<ApplicantExperienceSchemaType>({
      section: "experience",
      schema: ApplicantExperienceSchema,
      defaultValues: {
        experiences: toExperienceEntries(applicant.experiences),
      },
    });

  const { fields, append, remove } = useFieldArray<
    ApplicantExperienceSchemaType,
    "experiences"
  >({ control: form.control, name: "experiences" });

  // Watched rather than read off the submitted values, so ticking "I currently
  // work here" disables that entry's end date as you go.
  const experiences = form.watch("experiences");

  return (
    <ProfileSectionCard
      id="experience"
      title="Work experience"
      description="The roles you've held, most recent first."
      isDirty={isDirty}
      isSubmitting={isSubmitting}
      justSaved={justSaved}
      onSubmit={onSubmit}
    >
      <Form {...form}>
        <RepeatableFieldset
          itemLabel="role"
          emptyPrompt="No roles yet. Add the ones you want employers to see."
          fields={fields}
          onAdd={() => append(EMPTY_EXPERIENCE_ENTRY)}
          onRemove={(index) => remove(index)}
        >
          {(index) => (
            <ExperienceEntryFields
              control={form.control}
              index={index}
              isCurrent={experiences?.[index]?.current}
            />
          )}
        </RepeatableFieldset>
      </Form>
    </ProfileSectionCard>
  );
}
