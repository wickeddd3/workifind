"use client";

import type { Control, FieldValues, Path } from "react-hook-form";

import { TextInputField } from "@/shared/ui/form-fields/TextInputField";

/** The fields of one certificate — see `ExperienceEntryFields` for why these
 *  live in the entity. */
export function CertificationEntryFields<T extends FieldValues>({
  control,
  index,
}: {
  control: Control<T>;
  index: number;
}) {
  const path = (field: string) => `certifications.${index}.${field}` as Path<T>;

  return (
    <>
      <div className="flex flex-wrap gap-4">
        <TextInputField
          control={control}
          name={path("name")}
          label="Certificate"
          placeholder="e.g. AWS Solutions Architect"
        />
        <TextInputField
          control={control}
          name={path("issuer")}
          label="Issued by"
          placeholder="e.g. Amazon Web Services"
        />
      </div>

      <div className="flex flex-wrap gap-4">
        <TextInputField
          control={control}
          type="month"
          name={path("issueDate")}
          label="Issued"
        />
        <TextInputField
          control={control}
          type="month"
          name={path("expiryDate")}
          label="Expires"
        />
      </div>

      <div className="flex flex-wrap gap-4">
        <TextInputField
          control={control}
          name={path("credentialId")}
          label="Credential ID"
        />
        <TextInputField
          control={control}
          type="url"
          name={path("credentialUrl")}
          label="Credential link"
          placeholder="https://"
        />
      </div>
    </>
  );
}
