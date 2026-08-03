import {
  toCertificationCreateInputs,
  toEducationCreateInputs,
  toExperienceCreateInputs,
  toLanguageCreateInputs,
  toPreferredLocationCreateInputs,
  toSkillCreateInputs,
} from "@/entities/applicant";

import type { ApplicantProfileSchemaType } from "./schema";

export function mapApplicantForm(formData: ApplicantProfileSchemaType) {
  // Everything the applicant lists rather than states once is a row in its own
  // table, so all six are pulled out of the spread and written as nested
  // creates rather than as columns on the profile.
  const {
    experiences,
    educations,
    certifications,
    skills,
    languages,
    preferredLocations,
    ...fields
  } = formData;

  return {
    ...fields,
    preferredLocationTypes: formData.preferredLocationTypes || [],
    preferredEmploymentTypes: formData.preferredEmploymentTypes || [],
    salaryExpectation: parseInt(formData?.salaryExpectation?.toString() || "0"),
    experiences: { create: toExperienceCreateInputs(experiences) },
    educations: { create: toEducationCreateInputs(educations) },
    certifications: { create: toCertificationCreateInputs(certifications) },
    skills: { create: toSkillCreateInputs(skills) },
    languages: { create: toLanguageCreateInputs(languages) },
    preferredLocations: {
      create: toPreferredLocationCreateInputs(preferredLocations),
    },
  };
}
