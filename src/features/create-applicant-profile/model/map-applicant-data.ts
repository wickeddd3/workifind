import {
  toCertificationCreateInputs,
  toEducationCreateInputs,
  toExperienceCreateInputs,
} from "@/entities/applicant";

import type { ApplicantProfileSchemaType } from "./schema";

export function mapApplicantForm(formData: ApplicantProfileSchemaType) {
  // The CV records are rows in their own tables, so they are pulled out of the
  // spread and written as nested creates rather than as columns on the profile.
  const { experiences, educations, certifications, ...fields } = formData;

  return {
    ...fields,
    skills: formData.skills?.map((skill) => JSON.stringify(skill)) || [],
    languages:
      formData.languages?.map((language) => JSON.stringify(language)) || [],
    preferredLocations:
      formData.preferredLocations?.map((preferredLocation) =>
        JSON.stringify(preferredLocation),
      ) || [],
    preferredLocationTypes: formData.preferredLocationTypes || [],
    preferredEmploymentTypes: formData.preferredEmploymentTypes || [],
    salaryExpectation: parseInt(formData?.salaryExpectation?.toString() || "0"),
    experiences: { create: toExperienceCreateInputs(experiences) },
    educations: { create: toEducationCreateInputs(educations) },
    certifications: { create: toCertificationCreateInputs(certifications) },
  };
}
