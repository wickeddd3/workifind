"use client";

import type { Control, FieldValues, Path } from "react-hook-form";

import { CheckboxField } from "@/shared/ui/form-fields/CheckboxField";
import { TextAreaField } from "@/shared/ui/form-fields/TextAreaField";
import { TextInputField } from "@/shared/ui/form-fields/TextInputField";

/** The fields of one qualification — see `ExperienceEntryFields` for why these
 *  live in the entity. */
export function EducationEntryFields<T extends FieldValues>({
  control,
  index,
  isCurrent,
}: {
  control: Control<T>;
  index: number;
  isCurrent?: boolean;
}) {
  const path = (field: string) => `educations.${index}.${field}` as Path<T>;

  return (
    <>
      <TextInputField
        control={control}
        name={path("school")}
        label="School or university"
      />

      <div className="flex flex-wrap gap-4">
        <TextInputField
          control={control}
          name={path("degree")}
          label="Degree"
          placeholder="e.g. BSc"
        />
        <TextInputField
          control={control}
          name={path("fieldOfStudy")}
          label="Field of study"
          placeholder="e.g. Computer Science"
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
        label="I'm still studying here"
      />

      <TextAreaField
        control={control}
        name={path("description")}
        label="Notes"
        placeholder="Optional — honours, thesis, anything worth calling out"
      />
    </>
  );
}
