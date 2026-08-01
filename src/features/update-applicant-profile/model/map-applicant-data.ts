import type { Prisma } from "@prisma/client";

import type {
  ApplicantProfileSchemaType,
  ApplicantSection,
  ApplicantSectionValues,
} from "./schema";

/**
 * The three list fields are Json columns holding an array of stringified
 * objects, so they are serialized on the way in.
 */
function serializeList(list?: { name: string }[]) {
  return list?.map((item) => JSON.stringify(item));
}

function toWholeNumber(value: unknown) {
  return parseInt(value?.toString() || "0");
}

/**
 * Build the Prisma update for one section.
 *
 * Returning only that section's columns is what makes a section save
 * independent: saving skills cannot clobber a preference edited elsewhere, and
 * a section the user never touched is never written at all.
 */
export function mapApplicantSection<S extends ApplicantSection>(
  section: S,
  values: ApplicantSectionValues[S],
): Prisma.ApplicantUpdateInput {
  switch (section) {
    case "identity": {
      const v = values as ApplicantSectionValues["identity"];
      return {
        firstName: v.firstName,
        lastName: v.lastName,
        profession: v.profession,
        experienced: v.experienced,
        email: v.email,
        phoneNumber: v.phoneNumber,
        location: v.location,
      };
    }
    case "about": {
      const v = values as ApplicantSectionValues["about"];
      return { about: v.about };
    }
    case "skills": {
      const v = values as ApplicantSectionValues["skills"];
      return { skills: serializeList(v.skills) };
    }
    case "languages": {
      const v = values as ApplicantSectionValues["languages"];
      return { languages: serializeList(v.languages) };
    }
    case "preferences": {
      const v = values as ApplicantSectionValues["preferences"];
      return {
        availability: v.availability,
        preferredEmploymentTypes: v.preferredEmploymentTypes,
        preferredLocationTypes: v.preferredLocationTypes,
        preferredLocations: serializeList(v.preferredLocations),
        salaryExpectation: toWholeNumber(v.salaryExpectation),
      };
    }
  }

  // Unreachable while the switch stays exhaustive; guards a future section that
  // forgets to add a case.
  throw new Error(`Unhandled applicant section: ${section}`);
}

/** Whole-profile mapping, for flows that still write every field at once. */
export function mapApplicantForm(formData: ApplicantProfileSchemaType) {
  return {
    ...formData,
    skills: serializeList(formData.skills),
    languages: serializeList(formData.languages),
    preferredLocations: serializeList(formData.preferredLocations),
    salaryExpectation: toWholeNumber(formData.salaryExpectation),
  };
}
