"use server";

import { toSlug } from "@/lib/utils";
import { createEmployerProfileSchema } from "@/lib/validation";
import { nanoid } from "nanoid";
import { put } from "@vercel/blob";
import path from "path";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

type FormState = { error?: string } | undefined;

export async function updateEmployerProfile(
  id: number,
  formData: FormData,
): Promise<FormState> {
  try {
    if (!id) return { error: "Employer id missing" };

    const values = Object.fromEntries(formData.entries());

    const {
      companyName,
      companyEmail,
      companyWebsite,
      companyLogo,
      industry,
      location,
      about,
      pitch,
    } = createEmployerProfileSchema.parse(values);

    const slug = `${toSlug(companyName)}-${nanoid(10)}`;

    let companyLogoUrl: string | undefined = undefined;

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

    await prisma.employer.update({
      where: { id },
      data: {
        companyName: companyName.trim(),
        companyEmail: companyEmail?.trim(),
        companyWebsite: companyWebsite?.trim(),
        companyLogoUrl,
        industry,
        location: location?.trim(),
        about: about?.trim(),
        pitch: pitch?.trim(),
      },
    });

    redirect("/profile");
  } catch (error) {
    let message = "Unexpected error";
    if (error instanceof Error) {
      message = error.message;
    }
    return { error: message };
  }
}
