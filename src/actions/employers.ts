"use server";

import { baseUrl } from "@/lib/baseUrl";
import {
  createEmployerProfileSchema,
  CreateEmployerProfileValues,
} from "@/lib/validation";
import { auth } from "@clerk/nextjs/server";
import { createUser } from "@/actions/user";
import { redirect } from "next/navigation";
import { toSlug } from "@/lib/utils";
import { nanoid } from "nanoid";
import { put } from "@vercel/blob";
import path from "path";

type FormState = { error?: string } | undefined;

export async function getEmployer(id: number) {
  const response = await fetch(`${baseUrl}/api/employers/${id}`);

  if (response.status === 200) {
    const responseBody = await response.json();
    const { employer } = responseBody;

    return employer;
  }

  return null;
}

export async function createEmployer(
  userId: number,
  form: CreateEmployerProfileValues,
) {
  const response = await fetch(`${baseUrl}/api/employers/create`, {
    method: "POST",
    body: JSON.stringify({ userId, form }),
  });

  if (response.status === 200) {
    const responseBody = await response.json();
    const { employer } = responseBody;

    return employer;
  }

  return null;
}

export async function updateEmployer(
  id: number,
  form: CreateEmployerProfileValues,
) {
  const response = await fetch(`${baseUrl}/api/employers/${id}`, {
    method: "PUT",
    body: JSON.stringify({ form }),
  });

  if (response.status === 200) {
    const responseBody = await response.json();
    const { employer } = responseBody;

    return employer;
  }

  return null;
}

export async function createEmployerProfile(
  formData: FormData,
): Promise<FormState> {
  try {
    // Step 1: Verify User Authentication
    const { userId } = auth();
    if (!userId) return { error: "Auth id missing" };

    // Step 2: Create User with Role "EMPLOYER"
    const user = await createUser(userId, "EMPLOYER");
    if (!user) return { error: "Error occurred while creating the user" };

    // Step 3: Transform Form Data
    const rawData = Object.fromEntries(formData.entries());
    const transformedData = {
      ...rawData,
      perks:
        typeof rawData.perks === "string" && rawData.perks
          ? rawData.perks.split(",").map((s) => s.trim())
          : [],
    };

    // Step 4: Validate Data
    const parsedData = createEmployerProfileSchema.safeParse(transformedData);
    if (!parsedData.success) {
      console.error("Validation Errors:", parsedData.error.format());
      return { error: "Validation failed" };
    }
    const validatedData = parsedData.data;

    // Step 5: Create a slug based on companyName
    const slug = `${toSlug(validatedData.companyName)}-${nanoid(10)}`;

    // Step 6: Upload Company Logo if exist
    let companyLogoUrl: string | undefined = undefined;
    const { companyLogo } = validatedData;
    if (companyLogo) {
      const blob = await put(
        `company_logo/${slug}${path.extname(companyLogo.name)}`,
        companyLogo,
        {
          access: "public",
          addRandomSuffix: false,
        },
      );
      companyLogoUrl = blob.url;
    }

    // Step 7: Prepare Form Data
    const form = {
      slug,
      companyLogoUrl,
      companyName: validatedData.companyName?.trim(),
      companyEmail: validatedData.companyEmail?.trim(),
      companyWebsite: validatedData.companyWebsite?.trim(),
      location: validatedData.location?.trim(),
      about: validatedData.about?.trim(),
      pitch: validatedData.pitch?.trim(),
      perks: validatedData.perks,
      industry: validatedData.industry,
    };

    // Step 8: Create Employer Profile
    await createEmployer(user.id, form);

    // Step 9: Redirect to Profile Page
    redirect("/employer/profile");
  } catch (error) {
    let message = "Unexpected error";
    if (error instanceof Error) {
      message = error.message;
    }
    return { error: message };
  }
}

export async function updateEmployerProfile(
  id: number,
  formData: FormData,
): Promise<FormState> {
  try {
    // Step 1: Verify if Employer ID exist
    if (!id) return { error: "Employer id missing" };

    // Step 2: Transform Form Data
    const rawData = Object.fromEntries(formData.entries());
    const transformedData = {
      ...rawData,
      perks:
        typeof rawData.perks === "string" && rawData.perks
          ? rawData.perks.split(",").map((s) => s.trim())
          : [],
    };

    // Step 3: Validate Data
    const parsedData = createEmployerProfileSchema.safeParse(transformedData);
    if (!parsedData.success) {
      console.error("Validation Errors:", parsedData.error.format());
      return { error: "Validation failed" };
    }
    const validatedData = parsedData.data;

    // Step 4: Create a slug based on companyName
    const slug = `${toSlug(validatedData.companyName)}-${nanoid(10)}`;

    // Step 5: Upload Company Logo if exist
    let companyLogoUrl: string | undefined = undefined;
    const { companyLogo } = validatedData;
    if (companyLogo) {
      const blob = await put(
        `company_logo/${slug}${path.extname(companyLogo.name)}`,
        companyLogo,
        {
          access: "public",
          addRandomSuffix: false,
        },
      );
      companyLogoUrl = blob.url;
    }

    // Step 6: Prepare Form Data
    const form = {
      slug,
      companyLogoUrl,
      companyName: validatedData.companyName?.trim(),
      companyEmail: validatedData.companyEmail?.trim(),
      companyWebsite: validatedData.companyWebsite?.trim(),
      location: validatedData.location?.trim(),
      about: validatedData.about?.trim(),
      pitch: validatedData.pitch?.trim(),
      perks: validatedData.perks,
      industry: validatedData.industry,
    };

    // Step 7: Update Employer Profile
    await updateEmployer(id, form);

    // Step 8: Redirect to Profile Page
    redirect("/employer/profile");
  } catch (error) {
    let message = "Unexpected error";
    if (error instanceof Error) {
      message = error.message;
    }
    return { error: message };
  }
}
