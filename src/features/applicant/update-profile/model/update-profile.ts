import { updateApplicant } from "../api/actions";
import { ApplicantProfileSchemaType } from "./schema";

export async function updateApplicantProfile(
  id: number,
  formData: ApplicantProfileSchemaType,
) {
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

    const applicant = await updateApplicant(id.toString(), form);

    return applicant;
  } catch (error) {
    let message = "Unexpected error";
    if (error instanceof Error) {
      message = error.message;
    }
    return { error: message };
  }
}
