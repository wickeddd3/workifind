"use client";

import { useFieldArray } from "react-hook-form";

import type { Applicant } from "@/entities/applicant";
import { Form } from "@/shared/ui/form";
import { DynamicListField } from "@/shared/ui/form-fields/DynamicListField";
import { ProfileSectionCard } from "@/shared/ui/profile/ProfileSectionCard";

import {
  ApplicantSkillsSchema,
  type ApplicantSkillsSchemaType,
} from "../../model/schema";
import { useProfileSection } from "../use-profile-section";

export function SkillsSection({ applicant }: { applicant: Applicant }) {
  const { form, onSubmit, isDirty, isSubmitting, justSaved } =
    useProfileSection<ApplicantSkillsSchemaType>({
      section: "skills",
      schema: ApplicantSkillsSchema,
      defaultValues: { skills: applicant.skills ?? [] },
    });

  const { fields, append, remove } = useFieldArray<
    ApplicantSkillsSchemaType,
    "skills"
  >({ control: form.control, name: "skills" });

  return (
    <ProfileSectionCard
      id="skills"
      title="Skills"
      description="What you work with. These are matched against job descriptions."
      isDirty={isDirty}
      isSubmitting={isSubmitting}
      justSaved={justSaved}
      onSubmit={onSubmit}
    >
      <Form {...form}>
        <DynamicListField
          control={form.control}
          name="skills"
          label="Skills"
          fields={fields}
          append={() => append({ name: "" })}
          remove={(index) => remove(index)}
        />
      </Form>
    </ProfileSectionCard>
  );
}
