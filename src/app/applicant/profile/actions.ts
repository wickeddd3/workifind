"use server";

import { createApplicantProfileSchema } from "@/lib/validation";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

type FormState = { error?: string } | undefined;

export async function updateApplicantProfile(
  id: number,
  formData: FormData,
): Promise<FormState> {
  try {
    if (!id) return { error: "Applicant id missing" };

    const values = Object.fromEntries(formData.entries());

    const { firstName, lastName, email, phoneNumber, location, about } =
      createApplicantProfileSchema.parse(values);

    await prisma.applicant.update({
      where: { id },
      data: {
        firstName: firstName.trim(),
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
