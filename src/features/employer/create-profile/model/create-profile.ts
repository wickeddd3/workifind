import { baseUrl } from "@/shared/config/base-url";
import { toSlug } from "@/shared/utils/format-text";
import { removeObjectProperty } from "@/shared/utils/object-manipulation";
import { nanoid } from "nanoid";
import { EmployerProfileSchemaType } from "./schema";
import { createEmployer } from "../api/actions";

export const createEmployerProfile = async (
  formData: EmployerProfileSchemaType,
) => {
  try {
    const { companyLogo, companyName } = formData;

    // Create slug using company name
    const slug = `${toSlug(companyName)}-${nanoid(10)}`;

    // Upload company logo and generate companyLogoUrl
    let companyLogoUrl = "";
    if (companyLogo) {
      const file = companyLogo as File;
      const logoUpload = await fetch(`${baseUrl}/api/employers/upload/logo`, {
        method: "POST",
        body: file,
      });
      const imageUrl = await logoUpload.json();
      companyLogoUrl = imageUrl; // Get the uploaded file URL
    }

    // Remove companyLogo from formData
    const trimmedObject = removeObjectProperty(formData, "companyLogo");

    // Prepare Form Data
    const form = {
      ...trimmedObject,
      perks: formData.perks?.map((item) => JSON.stringify(item)) || [],
      slug,
      companyLogoUrl,
    };

    // Create employer profile
    const employer = await createEmployer(form);

    // Add auth user role
    await fetch(`${baseUrl}/api/auth/role`, {
      method: "POST",
      body: JSON.stringify({ role: "EMPLOYER" }),
    });

    return employer;
  } catch (error) {
    let message = "Unexpected error";
    if (error instanceof Error) {
      message = error.message;
    }
    return { error: message };
  }
};
