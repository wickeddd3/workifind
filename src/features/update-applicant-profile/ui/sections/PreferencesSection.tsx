"use client";

import { useFieldArray } from "react-hook-form";

import type { Applicant } from "@/entities/applicant";
import {
  AVAILABILITY_TYPES,
  EMPLOYMENT_TYPES,
  LOCATION_TYPES,
} from "@/shared/constants/tags";
import { Form } from "@/shared/ui/form";
import { CheckboxGroupField } from "@/shared/ui/form-fields/CheckboxGroupField";
import { DynamicListField } from "@/shared/ui/form-fields/DynamicListField";
import { RadioGroupField } from "@/shared/ui/form-fields/RadioGroupField";
import { TextInputField } from "@/shared/ui/form-fields/TextInputField";

import {
  ApplicantPreferencesSchema,
  type ApplicantPreferencesSchemaType,
} from "../../model/schema";
import { ProfileSectionCard } from "../ProfileSectionCard";
import { useProfileSection } from "../use-profile-section";

const locationTypes = LOCATION_TYPES.map((type) => type.value);
const employmentTypes = EMPLOYMENT_TYPES.map((type) => type.value);

export function PreferencesSection({ applicant }: { applicant: Applicant }) {
  const { form, onSubmit, isDirty, isSubmitting, justSaved } =
    useProfileSection<ApplicantPreferencesSchemaType>({
      section: "preferences",
      schema: ApplicantPreferencesSchema,
      defaultValues: {
        availability: applicant.availability ?? "",
        preferredEmploymentTypes: applicant.preferredEmploymentTypes ?? [],
        preferredLocationTypes: applicant.preferredLocationTypes ?? [],
        preferredLocations: applicant.preferredLocations ?? [],
        salaryExpectation: applicant.salaryExpectation,
      },
    });

  const { fields, append, remove } = useFieldArray<
    ApplicantPreferencesSchemaType,
    "preferredLocations"
  >({ control: form.control, name: "preferredLocations" });

  return (
    <ProfileSectionCard
      id="preferences"
      title="Job preferences"
      description="What you're looking for. Employers filter on these."
      isDirty={isDirty}
      isSubmitting={isSubmitting}
      justSaved={justSaved}
      onSubmit={onSubmit}
    >
      <Form {...form}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <TextInputField
              control={form.control}
              type="number"
              name="salaryExpectation"
              label="Salary expectation"
            />
          </div>
          <RadioGroupField
            control={form.control}
            options={AVAILABILITY_TYPES}
            name="availability"
            label="Availability"
          />
          <CheckboxGroupField
            control={form.control}
            options={locationTypes}
            name="preferredLocationTypes"
            label="Preferred location types"
          />
          <CheckboxGroupField
            control={form.control}
            options={employmentTypes}
            name="preferredEmploymentTypes"
            label="Preferred employment types"
          />
          <DynamicListField
            control={form.control}
            name="preferredLocations"
            label="Preferred locations"
            fields={fields}
            append={() => append({ name: "" })}
            remove={(index) => remove(index)}
          />
        </div>
      </Form>
    </ProfileSectionCard>
  );
}
