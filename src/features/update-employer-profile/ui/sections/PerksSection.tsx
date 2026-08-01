"use client";

import { useFieldArray } from "react-hook-form";

import type { Employer } from "@/entities/employer";
import { Form } from "@/shared/ui/form";
import { DynamicListField } from "@/shared/ui/form-fields/DynamicListField";
import { ProfileSectionCard } from "@/shared/ui/profile/ProfileSectionCard";

import {
  EmployerPerksSchema,
  type EmployerPerksSchemaType,
} from "../../model/schema";
import { useEmployerSection } from "../use-employer-section";

export function PerksSection({ employer }: { employer: Employer }) {
  const { form, onSubmit, isDirty, isSubmitting, justSaved } =
    useEmployerSection<EmployerPerksSchemaType>({
      section: "perks",
      schema: EmployerPerksSchema,
      defaultValues: { perks: employer.perks ?? [] },
    });

  const { fields, append, remove } = useFieldArray<
    EmployerPerksSchemaType,
    "perks"
  >({ control: form.control, name: "perks" });

  return (
    <ProfileSectionCard
      id="perks"
      title="Perks"
      description="What you offer beyond salary."
      isDirty={isDirty}
      isSubmitting={isSubmitting}
      justSaved={justSaved}
      onSubmit={onSubmit}
    >
      <Form {...form}>
        <DynamicListField
          control={form.control}
          name="perks"
          label="Perks"
          fields={fields}
          append={() => append({ name: "" })}
          remove={(index) => remove(index)}
        />
      </Form>
    </ProfileSectionCard>
  );
}
