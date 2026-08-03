"use client";

import type { Control, FieldValues, Path } from "react-hook-form";

import {
  AVAILABILITY_TYPES,
  EMPLOYMENT_TYPES,
  LOCATION_TYPES,
} from "@/shared/constants/tags";
import { CheckboxGroupField } from "@/shared/ui/form-fields/CheckboxGroupField";
import { RadioGroupField } from "@/shared/ui/form-fields/RadioGroupField";
import { TextInputField } from "@/shared/ui/form-fields/TextInputField";

const locationTypes = LOCATION_TYPES.map((type) => type.value);
const employmentTypes = EMPLOYMENT_TYPES.map((type) => type.value);

/**
 * What an applicant is looking for, minus the preferred locations.
 *
 * Job preferences are not a repeating record like the rest of the profile —
 * they are one settings block, stated once. What they share with the records is
 * that both profile forms collect them, and until this existed each form spelled
 * out the same four fields with its own labels and its own idea of the order.
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
      <TextInputField
        control={control}
        type="number"
        name={"salaryExpectation" as Path<T>}
        label="Salary expectation"
      />
      <RadioGroupField
        control={control}
        options={AVAILABILITY_TYPES}
        name={"availability" as Path<T>}
        label="Availability"
      />
      <CheckboxGroupField
        control={control}
        options={locationTypes}
        name={"preferredLocationTypes" as Path<T>}
        label="Preferred location types"
      />
      <CheckboxGroupField
        control={control}
        options={employmentTypes}
        name={"preferredEmploymentTypes" as Path<T>}
        label="Preferred employment types"
      />
    </>
  );
}
