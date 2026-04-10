import type { JobSchemaType } from "@/entities/job";
import { toSlug } from "@/shared/utils/format-text";
import { nanoid } from "nanoid";

export function mapJobForm(formData: JobSchemaType) {
  // Create slug based on job title
  const slug = `${toSlug(formData.title)}-${nanoid(10)}`;

  return {
    ...formData,
    slug,
    minSalary: parseInt(formData?.minSalary?.toString() || "0"),
    maxSalary: parseInt(formData?.maxSalary?.toString() || "0"),
  };
}
