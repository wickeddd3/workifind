"use client";

import type { Employer } from "@/entities/employer";
import { INDUSTRY_TYPES } from "@/shared/constants/tags";
import { Form } from "@/shared/ui/form";
import { SelectField } from "@/shared/ui/form-fields/SelectField";
import { TextInputField } from "@/shared/ui/form-fields/TextInputField";
import { ProfileSectionCard } from "@/shared/ui/profile/ProfileSectionCard";

import {
  EmployerOverviewSchema,
  type EmployerOverviewSchemaType,
} from "../../model/schema";
import { useEmployerSection } from "../use-employer-section";

export function OverviewSection({ employer }: { employer: Employer }) {
  const { form, onSubmit, isDirty, isSubmitting, justSaved } =
    useEmployerSection<EmployerOverviewSchemaType>({
      section: "overview",
      schema: EmployerOverviewSchema,
      defaultValues: {
        industry: employer.industry ?? "",
        location: employer.location ?? "",
      },
    });

  return (
    <ProfileSectionCard
      id="overview"
      title="Company overview"
      description="Candidates filter jobs by industry, so this decides who finds you."
      isDirty={isDirty}
      isSubmitting={isSubmitting}
      justSaved={justSaved}
      onSubmit={onSubmit}
    >
      <Form {...form}>
        <div className="flex flex-col gap-4 sm:flex-row">
          <SelectField
            control={form.control}
            name="industry"
            label="Industry"
            options={INDUSTRY_TYPES}
          />
          <TextInputField
            control={form.control}
            name="location"
            label="Location"
            placeholder="e.g. Austin"
          />
        </div>
      </Form>
    </ProfileSectionCard>
  );
}
