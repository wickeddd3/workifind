import { ApplicantProfileSchemaType } from "./schema";

export function mapApplicantForm(formData: ApplicantProfileSchemaType) {
  return {
    ...formData,
    skills: formData.skills?.map((skill) => JSON.stringify(skill)),
    languages: formData.languages?.map((language) => JSON.stringify(language)),
    preferredLocations: formData.preferredLocations?.map((preferredLocation) =>
      JSON.stringify(preferredLocation),
    ),
    salaryExpectation: parseInt(formData?.salaryExpectation?.toString() || "0"),
  };
}
