"use client";

import type { Employer } from "@/entities/employer";
import { Form } from "@/shared/ui/form";
import { RichTextField } from "@/shared/ui/form-fields/RichEditorTextField";
import { ProfileSectionCard } from "@/shared/ui/profile/ProfileSectionCard";

import {
  EmployerCultureSchema,
  type EmployerCultureSchemaType,
} from "../../model/schema";
import { useEmployerSection } from "../use-employer-section";

export function CultureSection({ employer }: { employer: Employer }) {
  const { form, onSubmit, isDirty, isSubmitting, justSaved } =
    useEmployerSection<EmployerCultureSchemaType>({
      section: "culture",
      schema: EmployerCultureSchema,
      defaultValues: { pitch: employer.pitch ?? "" },
    });

  return (
    <ProfileSectionCard
      id="culture"
      title="Why join us?"
      description="The case for working here, against the other offers a candidate holds."
      isDirty={isDirty}
      isSubmitting={isSubmitting}
      justSaved={justSaved}
      onSubmit={onSubmit}
    >
      <Form {...form}>
        <RichTextField
          control={form.control}
          name="pitch"
          label="Why join us?"
        />
      </Form>
    </ProfileSectionCard>
  );
}
