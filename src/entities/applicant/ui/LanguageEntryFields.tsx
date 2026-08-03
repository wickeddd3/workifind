"use client";

import type { Control, FieldValues, Path } from "react-hook-form";

import { LANGUAGE_PROFICIENCIES } from "@/shared/constants/tags";
import { SelectField } from "@/shared/ui/form-fields/SelectField";
import { TextInputField } from "@/shared/ui/form-fields/TextInputField";

/** The fields of one language — see `SkillEntryFields` for the row layout. */
export function LanguageEntryFields<T extends FieldValues>({
  control,
  index,
}: {
  control: Control<T>;
  index: number;
}) {
  const path = (field: string) => `languages.${index}.${field}` as Path<T>;

  return (
    <div className="flex flex-wrap items-start gap-3">
      <TextInputField
        control={control}
        name={path("name")}
        label="Language"
        placeholder="e.g. Spanish"
        className="min-w-40 basis-full sm:basis-0"
      />
      <SelectField
        control={control}
        name={path("proficiency")}
        label="Proficiency"
        options={LANGUAGE_PROFICIENCIES}
        placeholder="Not stated"
        className="min-w-40 grow-0 basis-48"
      />
    </div>
  );
}
