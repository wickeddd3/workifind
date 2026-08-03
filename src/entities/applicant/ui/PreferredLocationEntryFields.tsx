"use client";

import type { Control, FieldValues, Path } from "react-hook-form";

import { TextInputField } from "@/shared/ui/form-fields/TextInputField";

/**
 * The one field of a preferred location.
 *
 * A single input hardly needs a component, but both profile forms collect it
 * and the label and placeholder are the part worth agreeing on — the two forms
 * previously called it "Preferred locations" in one place and nothing in the
 * other.
 */
export function PreferredLocationEntryFields<T extends FieldValues>({
  control,
  index,
}: {
  control: Control<T>;
  index: number;
}) {
  return (
    <TextInputField
      control={control}
      name={`preferredLocations.${index}.name` as Path<T>}
      label="Location"
      // The group heading above the list already says Locations; showing this
      // on every row read "Locations / Location / Location".
      labelHidden
      placeholder="e.g. Austin, or Remote"
    />
  );
}
