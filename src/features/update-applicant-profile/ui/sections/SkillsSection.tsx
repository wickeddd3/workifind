"use client";

import { useFieldArray } from "react-hook-form";

import {
  type ApplicantProfile,
  EMPTY_SKILL_ENTRY,
  SkillEntryFields,
  toSkillEntries,
} from "@/entities/applicant/client";
import { Form } from "@/shared/ui/form";
import { RepeatableFieldset } from "@/shared/ui/form-fields/RepeatableFieldset";
import { ProfileSectionCard } from "@/shared/ui/profile/ProfileSectionCard";

import {
  ApplicantSkillsSchema,
  type ApplicantSkillsSchemaType,
} from "../../model/schema";
import { useProfileSection } from "../use-profile-section";

export function SkillsSection({ applicant }: { applicant: ApplicantProfile }) {
  const { form, onSubmit, isDirty, isSubmitting, justSaved } =
    useProfileSection<ApplicantSkillsSchemaType>({
      section: "skills",
      schema: ApplicantSkillsSchema,
      defaultValues: { skills: toSkillEntries(applicant.skills) },
    });

  const { fields, append, remove } = useFieldArray<
    ApplicantSkillsSchemaType,
    "skills"
  >({ control: form.control, name: "skills" });

  return (
    <ProfileSectionCard
      id="skills"
      title="Skills"
      description="What you work with. These are matched against job descriptions — the level and years are optional."
      isDirty={isDirty}
      isSubmitting={isSubmitting}
      justSaved={justSaved}
      onSubmit={onSubmit}
    >
      <Form {...form}>
        <RepeatableFieldset
          variant="row"
          itemLabel="skill"
          emptyPrompt="No skills yet. These are what employers search on."
          fields={fields}
          onAdd={() => append(EMPTY_SKILL_ENTRY)}
          onRemove={(index) => remove(index)}
        >
          {(index) => <SkillEntryFields control={form.control} index={index} />}
        </RepeatableFieldset>
      </Form>
    </ProfileSectionCard>
  );
}
