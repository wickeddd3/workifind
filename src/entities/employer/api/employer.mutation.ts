"use server";

import prisma from "@/shared/lib/prisma";
import { getAuthUser } from "@/shared/lib/clerk.server";
import { upload } from "@/shared/lib/vercel-blob.server";
import type { EmployerProfileSchemaType } from "../model/schema";
import { removeObjectProperty } from "@/shared/utils/object-manipulation";
import { nanoid } from "nanoid";
import { toSlug } from "@/shared/utils/format-text";
import { baseUrl } from "@/shared/config/base-url";

export async function createEmployer(formData: EmployerProfileSchemaType) {
  try {
    const { userId } = await getAuthUser();

    if (!userId) {
      throw Error(
        "Error occurred, only authenticated user can create employer profile",
      );
    }

    const { companyLogo, companyName } = formData;

    // Create slug using company name
    const slug = `${toSlug(companyName)}-${nanoid(10)}`;

    // Upload company logo and generate companyLogoUrl
    let companyLogoUrl = null;
    if (companyLogo) {
      const imageUrl = await uploadEmployerLogo(companyLogo);
      companyLogoUrl = imageUrl; // Get the uploaded file URL
    }

    // Remove companyLogo from formData
    const trimmedObject = removeObjectProperty(formData, "companyLogo");

    // Prepare Form Data
    const form = {
      ...trimmedObject,
      perks: formData.perks?.map((item) => JSON.stringify(item)) || [],
      slug,
      companyLogoUrl,
    };

    // Create employer profile
    const employer = await prisma.employer.create({
      data: {
        ...form,
        userId,
      },
    });

    // Add auth user role
    await fetch(`${baseUrl}/api/auth/role`, {
      method: "POST",
      body: JSON.stringify({ role: "EMPLOYER" }),
    });

    return employer;
  } catch (error) {
    return null;
  }
}

export async function updateEmployer(
  id: number,
  formData: EmployerProfileSchemaType,
) {
  try {
    const { companyLogo, companyName } = formData;

    // Create slug using company name
    const slug = `${toSlug(companyName)}-${nanoid(10)}`;

    // Upload company logo and generate companyLogoUrl
    let companyLogoUrl = null;
    if (companyLogo) {
      const imageUrl = await uploadEmployerLogo(companyLogo);
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

    // Update employer profile
    const employer = await prisma.employer.update({
      where: { id },
      data: {
        ...form,
      },
    });

    return employer;
  } catch (error) {
    return null;
  }
}

export async function uploadEmployerLogo(file: File): Promise<string | null> {
  try {
    const filePath = `company-logo/${Date.now()}-${Math.random().toString(36).substring(7)}`;

    // Upload file to Vercel Blob Storage
    const blobUrl = await upload(file, filePath);

    return blobUrl;
  } catch (error) {
    return null;
  }
}
