import { toSlug } from "@/shared/utils/format-text";
import { updateEmployer, uploadEmployerLogo } from "../api/actions";
import { EmployerProfileSchemaType } from "./schema";
import { nanoid } from "nanoid";
import { removeObjectProperty } from "@/shared/utils/object-manipulation";

export async function updateEmployerProfile(
  id: number,
  formData: EmployerProfileSchemaType,
) {
  try {
    const { companyLogo, companyName } = formData;

    // Create slug using company name
    const slug = `${toSlug(companyName)}-${nanoid(10)}`;

    // Upload company logo and generate companyLogoUrl
    let companyLogoUrl = null;
    if (companyLogo) {
      const imageUrl = await uploadEmployerLogo(companyLogo);
      companyLogoUrl = imageUrl; // Get the uploaded file URL
    }

    // Remove companyLogo from formData
    const trimmedObject = removeObjectProperty(formData, "companyLogo");

    // Prepare Form Data
    const form = {
      ...trimmedObject,
      perks: formData.perks?.map((item) => JSON.stringify(item)),
      slug,
      companyLogoUrl,
    };

    // Update employer profile
    const employer = await updateEmployer(id, form);

    return employer;
  } catch (error) {
    let message = "Unexpected error";
    if (error instanceof Error) {
      message = error.message;
    }
    return { error: message };
  }
}
