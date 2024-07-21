"use server";

import { toSlug } from "@/lib/utils";
import { createApplicantProfileSchema, createEmployerProfileSchema } from "@/lib/validation";
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

    await prisma.employer.create({
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

    redirect("/profile");
  } catch (error) {
    let message = "Unexpected error";
    if (error instanceof Error) {
      message = error.message;
    }
    return { error: message };
  }
}

export async function createApplicantProfile(
  formData: FormData,
): Promise<FormState> {
  try {
    const { userId } = auth();

    if (!userId) return { error: "Auth id missing" };

    const user = await prisma.user.create({
      data: {
        authId: userId,
        role: "APPLICANT",
      },
    });

    if (!user) return { error: "Error occurred while creating the user" };

    const values = Object.fromEntries(formData.entries());

    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      location,
      about,
    } = createApplicantProfileSchema.parse(values);

    await prisma.applicant.create({
      data: {
        userId: user.id,
        firstName: firstName?.trim(),
        lastName: lastName?.trim(),
        email: email?.trim(),
        phoneNumber: phoneNumber?.trim(),
        location: location?.trim(),
        about: about?.trim(),
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