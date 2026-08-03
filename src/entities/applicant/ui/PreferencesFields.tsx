"use client";

import type { Control, FieldValues, Path } from "react-hook-form";

import {
  AVAILABILITY_TYPES,
  EMPLOYMENT_TYPES,
  LOCATION_TYPES,
} from "@/shared/constants/tags";
import { ChipSelectField } from "@/shared/ui/form-fields/ChipSelectField";
import { TextInputField } from "@/shared/ui/form-fields/TextInputField";

const availabilityOptions = AVAILABILITY_TYPES.map(({ label, value }) => ({
  label,
  value,
}));

/**
 * What an applicant is looking for, minus the preferred locations.
 *
 * Job preferences are not a repeating record like the rest of the profile —
 * they are one settings block, stated once. What they share with the records is
 * that both profile forms collect them, and until this existed each form spelled
 * out the same fields with its own labels and its own idea of the order.
 *
 * The layout mirrors what the profile shows: the two single facts pair up at
 * the top, the three sets follow as chips. Employment and work setting were two
 * stacked checkbox groups that looked identical to each other and to nothing on
 * the profile page.
 *
 * Preferred locations are left to the caller: they are a list, so they need a
 * `useFieldArray` of their own, and the two forms render them through
 * `RepeatableFieldset` alongside this group.
 */
export function PreferencesFields<T extends FieldValues>({
  control,
}: {
  control: Control<T>;
}) {
  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <TextInputField
          control={control}
          type="number"
          name={"salaryExpectation" as Path<T>}
          label="Salary expectation"
          prefix="$"
          className="sm:max-w-56"
        />
        <ChipSelectField
          control={control}
          name={"availability" as Path<T>}
          label="Available"
          options={availabilityOptions}
        />
      </div>

      <ChipSelectField
        control={control}
        multiple
        name={"preferredEmploymentTypes" as Path<T>}
        label="Employment"
        options={EMPLOYMENT_TYPES}
      />

      <ChipSelectField
        control={control}
        multiple
        name={"preferredLocationTypes" as Path<T>}
        label="Work setting"
        options={LOCATION_TYPES}
      />
    </>
  );
}
