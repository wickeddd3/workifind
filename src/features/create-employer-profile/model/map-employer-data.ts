import { nanoid } from "nanoid";

import { toSlug } from "@/shared/utils/format-text";
import { removeObjectProperty } from "@/shared/utils/object-manipulation";

import type { EmployerProfileSchemaType } from "./schema";

export function mapEmployerForm(formData: EmployerProfileSchemaType) {
  // Create slug using company name
  const slug = `${toSlug(formData.companyName)}-${nanoid(10)}`;

  // The logo token is a signed reference to an upload, not a column. The action
  // verifies it and supplies `companyLogoUrl` itself.
  const trimmedObject = removeObjectProperty(formData, "logoToken");

  return {
    ...trimmedObject,
    perks: formData.perks?.map((item) => JSON.stringify(item)) || [],
    slug,
  };
}
