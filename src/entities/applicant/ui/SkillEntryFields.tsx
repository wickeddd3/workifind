"use client";

import type { Control, FieldValues, Path } from "react-hook-form";

import { SKILL_LEVELS } from "@/shared/constants/tags";
import { SelectField } from "@/shared/ui/form-fields/SelectField";
import { TextInputField } from "@/shared/ui/form-fields/TextInputField";

/**
 * The fields of one skill — see `ExperienceEntryFields` for why these live in
 * the entity.
 *
 * Laid out as a single row rather than the stacked block a role gets. A CV
 * carries three jobs and fifteen skills, and fifteen bordered blocks is a page
 * nobody scrolls to the end of.
 */
export function SkillEntryFields<T extends FieldValues>({
  control,
  index,
}: {
  control: Control<T>;
  index: number;
}) {
  const path = (field: string) => `skills.${index}.${field}` as Path<T>;

  return (
    <div className="flex flex-wrap items-start gap-3">
      <TextInputField
        control={control}
        name={path("name")}
        label="Skill"
        placeholder="e.g. TypeScript"
        className="min-w-40 basis-full sm:basis-0"
      />
      <SelectField
        control={control}
        name={path("level")}
        label="Level"
        options={SKILL_LEVELS}
        placeholder="Not stated"
        className="min-w-36 grow-0 basis-40"
      />
      <TextInputField
        control={control}
        type="number"
        name={path("years")}
        label="Years"
        className="grow-0 basis-24"
      />
    </div>
  );
}
