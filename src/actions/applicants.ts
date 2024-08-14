"use server";

import { auth } from "@clerk/nextjs/server";
import { createUser } from "@/actions/user";
import {
  createApplicantProfileSchema,
  CreateApplicantProfileValues,
} from "@/lib/validation";
import { baseUrl } from "@/lib/baseUrl";

type FormState = { error?: string } | undefined;

export async function getApplicant(id: number) {
  const response = await fetch(`${baseUrl}/api/applicants/${id}`);

  if (response.status === 200) {
    const responseBody = await response.json();
    const { applicant } = responseBody;

    return applicant;
  }

  return null;
}

export async function createApplicant(
  userId: number,
  form: CreateApplicantProfileValues,
) {
  const response = await fetch(`${baseUrl}/api/applicants/create`, {
    method: "POST",
    body: JSON.stringify({ userId, form }),
  });

  if (response.status === 200) {
    const responseBody = await response.json();
    const { applicant } = responseBody;

    return applicant;
  }

  return null;
}

export async function updateApplicant(
  id: number,
  form: CreateApplicantProfileValues,
) {
  const response = await fetch(`${baseUrl}/api/applicants/${id}`, {
    method: "PUT",
    body: JSON.stringify({ form }),
  });

  if (response.status === 200) {
    const responseBody = await response.json();
    const { applicant } = responseBody;

    return applicant;
  }

  return null;
}

export async function createApplicantProfile(
  formData: FormData,
): Promise<FormState> {
  try {
    // Step 1: Verify User Authentication
    const { userId } = auth();
    if (!userId) return { error: "Auth id missing" };

    // Step 2: Create User with Role "APPLICANT"
    const user = await createUser(userId, "APPLICANT");
    if (!user) return { error: "Error occurred while creating the user" };

    // Step 3: Transform Form Data
    const rawData = Object.fromEntries(formData.entries());
    const transformedData = {
      ...rawData,
      experienced: rawData?.experienced === "true" ? true : false,
      salaryExpectation:
        typeof rawData.salaryExpectation === "string" &&
        rawData?.salaryExpectation
          ? parseInt(rawData.salaryExpectation)
          : 0,
      skills:
        typeof rawData.skills === "string" && rawData.skills
          ? rawData.skills.split(",").map((s) => s.trim())
          : [],
      languages:
        typeof rawData.languages === "string" && rawData.languages
          ? rawData.languages.split(",").map((l) => l.trim())
          : [],
      preferredEmploymentTypes:
        typeof rawData.preferredEmploymentTypes === "string" &&
        rawData.preferredEmploymentTypes
          ? rawData.preferredEmploymentTypes.split(",").map((p) => p.trim())
          : [],
      preferredLocationTypes:
        typeof rawData.preferredLocationTypes === "string" &&
        rawData.preferredLocationTypes
          ? rawData.preferredLocationTypes.split(",").map((p) => p.trim())
          : [],
      preferredLocations:
        typeof rawData.preferredLocations === "string" &&
        rawData.preferredLocations
          ? rawData.preferredLocations.split(",").map((p) => p.trim())
          : [],
    };

    // Step 4: Validate Data
    const parsedData = createApplicantProfileSchema.safeParse(transformedData);

    if (!parsedData.success) {
      console.error("Validation Errors:", parsedData.error.format());
      return { error: "Validation failed" };
    }

    const validatedData = parsedData.data;

    // Step 5: Prepare Form Data
    const form: CreateApplicantProfileValues = {
      ...validatedData,
      firstName: validatedData.firstName?.trim(),
      lastName: validatedData.lastName?.trim(),
      email: validatedData.email?.trim(),
      phoneNumber: validatedData.phoneNumber?.trim(),
      location: validatedData.location?.trim(),
      about: validatedData.about?.trim(),
      profession: validatedData.profession?.trim(),
    };

    // Step 6: Create Applicant Profile
    const createdApplicant = await createApplicant(user.id, form);

    return createdApplicant;
  } catch (error) {
    let message = "Unexpected error";
    if (error instanceof Error) {
      message = error.message;
    }
    return { error: message };
  }
}

export async function updateApplicantProfile(
  id: number,
  formData: FormData,
): Promise<FormState> {
  try {
    // Step 1: Verify if Applicant ID exist
    if (!id) return { error: "Applicant id missing" };

    // Step 2: Transform Form Data
    const rawData = Object.fromEntries(formData.entries());
    const transformedData = {
      ...rawData,
      experienced: rawData?.experienced === "true" ? true : false,
      salaryExpectation:
        typeof rawData.salaryExpectation === "string" &&
        rawData?.salaryExpectation
          ? parseInt(rawData.salaryExpectation)
          : 0,
      skills:
        typeof rawData.skills === "string" && rawData.skills
          ? rawData.skills.split(",").map((s) => s.trim())
          : [],
      languages:
        typeof rawData.languages === "string" && rawData.languages
          ? rawData.languages.split(",").map((l) => l.trim())
          : [],
      preferredEmploymentTypes:
        typeof rawData.preferredEmploymentTypes === "string" &&
        rawData.preferredEmploymentTypes
          ? rawData.preferredEmploymentTypes.split(",").map((p) => p.trim())
          : [],
      preferredLocationTypes:
        typeof rawData.preferredLocationTypes === "string" &&
        rawData.preferredLocationTypes
          ? rawData.preferredLocationTypes.split(",").map((p) => p.trim())
          : [],
      preferredLocations:
        typeof rawData.preferredLocations === "string" &&
        rawData.preferredLocations
          ? rawData.preferredLocations.split(",").map((p) => p.trim())
          : [],
    };

    // Step 3: Validate Data
    const parsedData = createApplicantProfileSchema.safeParse(transformedData);

    if (!parsedData.success) {
      console.error("Validation Errors:", parsedData.error.format());
      return { error: "Validation failed" };
    }

    const validatedData = parsedData.data;

    // Step 4: Prepare Form Data
    const form: CreateApplicantProfileValues = {
      ...validatedData,
      firstName: validatedData.firstName?.trim(),
      lastName: validatedData.lastName?.trim(),
      email: validatedData.email?.trim(),
      phoneNumber: validatedData.phoneNumber?.trim(),
      location: validatedData.location?.trim(),
      about: validatedData.about?.trim(),
      profession: validatedData.profession?.trim(),
    };

    // Step 5: Update Applicant Profile
    const updatedApplicant = await updateApplicant(id, form);

    return updatedApplicant;
  } catch (error) {
    let message = "Unexpected error";
    if (error instanceof Error) {
      message = error.message;
    }
    return { error: message };
  }
}
