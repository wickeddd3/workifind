"use server";

import { toSlug } from "@/lib/utils";
import { createEmployerProfileSchema } from "@/lib/validation";
import { nanoid } from "nanoid";
import { put } from "@vercel/blob";
import path from "path";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

type FormState = { error?: string } | undefined;

export async function createEmployerProfile(
  formData: FormData,
): Promise<FormState> {
  try {
    const { userId } = auth();

    if (!userId) return { error: "Auth id missing" };

    const user = await prisma.user.create({
      data: {
        authId: userId,
        role: "EMPLOYER",
      },
    });

    console.log(user);

    if (!user) return { error: "Error occurred while creating the user" };

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
    console.log(values);
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
      console.log(blob.url)
      companyLogoUrl = blob.url;
    }

    const employer = await prisma.employer.create({
      data: {
        userId: user.id,
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
    console.log(employer)

    redirect("/profile");
  } catch (error) {
    let message = "Unexpected error";
    if (error instanceof Error) {
      message = error.message;
    }
    return { error: message };
  }
}
