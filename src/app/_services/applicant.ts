import { baseUrl } from "@/config/base-url";
import { ApplicantProfileSchemaType } from "@/schema/applicant-profile";

export const createApplicantProfile = async (
  formData: ApplicantProfileSchemaType,
) => {
  try {
    //Prepare Form Data
    const form = {
      ...formData,
      skills: formData.skills?.map((skill) => JSON.stringify(skill)),
      languages: formData.languages?.map((language) =>
        JSON.stringify(language),
      ),
      preferredLocations: formData.preferredLocations?.map(
        (preferredLocation) => JSON.stringify(preferredLocation),
      ),
      salaryExpectation: parseInt(
        formData?.salaryExpectation?.toString() || "0",
      ),
    };

    // Create applicant profile
    const response = await fetch(`${baseUrl}/api/applicants`, {
      method: "POST",
      body: JSON.stringify({ form }),
    });

    // Add auth user role
    await fetch(`${baseUrl}/api/auth/role`, {
      method: "POST",
      body: JSON.stringify({ role: "APPLICANT" }),
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

export const getApplicantProfileByUserId = async (userId: string) => {
  const response = await fetch(`${baseUrl}/api/applicants/${userId}`);
  const data = await response.json();

  if (data?.error) return null;

  return {
    ...data,
    skills: data?.skills?.map((item: string) => JSON.parse(item)),
    languages: data?.languages?.map((item: string) => JSON.parse(item)),
    preferredLocations: data?.preferredLocations?.map((item: string) =>
      JSON.parse(item),
    ),
  };
};

export const updateApplicantProfile = async (
  id: number,
  formData: ApplicantProfileSchemaType,
) => {
  try {
    //Prepare Form Data
    const form = {
      ...formData,
      skills: formData.skills?.map((skill) => JSON.stringify(skill)),
      languages: formData.languages?.map((language) =>
        JSON.stringify(language),
      ),
      preferredLocations: formData.preferredLocations?.map(
        (preferredLocation) => JSON.stringify(preferredLocation),
      ),
      salaryExpectation: parseInt(
        formData?.salaryExpectation?.toString() || "0",
      ),
    };

    // Update applicant profile
    const response = await fetch(`${baseUrl}/api/applicants/${id}`, {
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
