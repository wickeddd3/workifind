import { nanoid } from "nanoid";

import { toSlug } from "@/shared/utils/format-text";
import { removeObjectProperty } from "@/shared/utils/object-manipulation";

import type { EmployerProfileSchemaType } from "./schema";

export function mapEmployerForm(formData: EmployerProfileSchemaType) {
  // Create slug using company name
  const slug = `${toSlug(formData.companyName)}-${nanoid(10)}`;

  // Remove companyLogo from formData
  const trimmedObject = removeObjectProperty(formData, "companyLogo");

  return {
    ...trimmedObject,
    perks: formData.perks?.map((item) => JSON.stringify(item)) || [],
    slug,
  };
}
