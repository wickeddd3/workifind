import { toSlug } from "@/shared/utils/format-text";
import type { EmployerProfileSchemaType } from "./schema";
import { nanoid } from "nanoid";
import { removeObjectProperty } from "@/shared/utils/object-manipulation";

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
