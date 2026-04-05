import { baseUrl } from "@/shared/config/base-url";
import { createApplicant } from "../api/actions";
import { ApplicantProfileSchemaType } from "./schema";

export const createApplicantProfile = async (
  formData: ApplicantProfileSchemaType,
) => {
  try {
    //Prepare Form Data
    const form = {
      ...formData,
      skills: formData.skills?.map((skill) => JSON.stringify(skill)) || [],
      languages:
        formData.languages?.map((language) => JSON.stringify(language)) || [],
      preferredLocations:
        formData.preferredLocations?.map((preferredLocation) =>
          JSON.stringify(preferredLocation),
        ) || [],
      preferredLocationTypes: formData.preferredLocationTypes || [],
      preferredEmploymentTypes: formData.preferredEmploymentTypes || [],
      salaryExpectation: parseInt(
        formData?.salaryExpectation?.toString() || "0",
      ),
    };

    // Create applicant profile
    const applicant = await createApplicant(form);

    // Add auth user role
    await fetch(`${baseUrl}/api/auth/role`, {
      method: "POST",
      body: JSON.stringify({ role: "APPLICANT" }),
    });

    return applicant;
  } catch (error) {
    let message = "Unexpected error";
    if (error instanceof Error) {
      message = error.message;
    }
    return { error: message };
  }
};
