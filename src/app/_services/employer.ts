import { baseUrl } from "@/lib/baseUrl";
import { EmployerProfileSchemaType } from "@/schema/employer-profile";
import { toSlug } from "@/lib/utils";
import { nanoid } from "nanoid";
import { removeObjectProperty } from "@/utils/object-manipulation";

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
      perks: formData.perks?.map((item) => JSON.stringify(item)),
      slug,
      companyLogoUrl,
    };

    // Create employer profile
    const response = await fetch(`${baseUrl}/api/employers`, {
      method: "POST",
      body: JSON.stringify({ form }),
    });

    // Add auth user role
    await fetch(`${baseUrl}/api/auth/role`, {
      method: "POST",
      body: JSON.stringify({ role: "EMPLOYER" }),
    });

    return await response.json();
  } catch (error) {
    let message = "Unexpected error";
    if (error instanceof Error) {
      message = error.message;
    }
    return { error: message };
  }
};

export const getEmployerProfileByUserId = async (userId: string) => {
  const response = await fetch(`${baseUrl}/api/employers/${userId}`);
  const data = await response.json();

  if (data?.error) return null;

  return {
    ...data,
    perks: data?.perks?.map((item: string) => JSON.parse(item)),
  };
};

export const updateEmployerProfile = async (
  id: number,
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
      perks: formData.perks?.map((item) => JSON.stringify(item)),
      slug,
      companyLogoUrl,
    };

    // Create employer profile
    const response = await fetch(`${baseUrl}/api/employers/${id}`, {
      method: "PUT",
      body: JSON.stringify({ form }),
    });

    return await response.json();
  } catch (error) {
    let message = "Unexpected error";
    if (error instanceof Error) {
      message = error.message;
    }
    return { error: message };
  }
};
