"use client";

import type { Control, FieldValues, Path } from "react-hook-form";

import { EMPLOYMENT_TYPES } from "@/shared/constants/tags";
import { CheckboxField } from "@/shared/ui/form-fields/CheckboxField";
import { SelectField } from "@/shared/ui/form-fields/SelectField";
import { TextAreaField } from "@/shared/ui/form-fields/TextAreaField";
import { TextInputField } from "@/shared/ui/form-fields/TextInputField";

/**
 * The fields of one role, wherever it is being entered.
 *
 * Lives in the entity because both the create-profile flow and the profile
 * editor collect the same record, and the two have already drifted apart on the
 * fields they share. Neither the card, the Save, nor the Add/Remove belong here
 * — those are the surrounding form's job.
 *
 * Generic over the form type, addressing `experiences.<index>.<field>`; both
 * callers name the array that way because both validate it with the same
 * schema.
 */
export function ExperienceEntryFields<T extends FieldValues>({
  control,
  index,
  isCurrent,
}: {
  control: Control<T>;
  index: number;
  /** Whether "I currently work here" is ticked, which moots the end date. */
  isCurrent?: boolean;
}) {
  const path = (field: string) => `experiences.${index}.${field}` as Path<T>;

  return (
    <>
      <div className="flex flex-wrap gap-4">
        <TextInputField
          control={control}
          name={path("title")}
          label="Job title"
          placeholder="e.g. Frontend Developer"
        />
        <TextInputField
          control={control}
          name={path("company")}
          label="Company"
        />
      </div>

      <div className="flex flex-wrap gap-4">
        <SelectField
          control={control}
          name={path("employmentType")}
          label="Employment type"
          options={EMPLOYMENT_TYPES}
        />
        <TextInputField
          control={control}
          name={path("location")}
          label="Location"
          placeholder="e.g. Austin, or Remote"
        />
      </div>

      <div className="flex flex-wrap gap-4">
        <TextInputField
          control={control}
          type="month"
          name={path("startDate")}
          label="Start"
        />
        <TextInputField
          control={control}
          type="month"
          name={path("endDate")}
          label="End"
          disabled={isCurrent}
        />
      </div>

      <CheckboxField
        control={control}
        name={path("current")}
        label="I currently work here"
      />

      <TextAreaField
        control={control}
        name={path("description")}
        label="What you did"
        placeholder="Optional — what you were responsible for"
      />
    </>
  );
}
