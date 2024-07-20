"use server";

import { toSlug } from "@/lib/utils";
import { createJobSchema } from "@/lib/validation";
import { nanoid } from "nanoid";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createJobPosting(id: number, formData: FormData) {
  const values = Object.fromEntries(formData.entries());

  const { title, employmentType, locationType, location, description, salary } =
    createJobSchema.parse(values);

  const slug = `${toSlug(title)}-${nanoid(10)}`;

  await prisma.job.create({
    data: {
      authorId: id,
      slug,
      title: title.trim(),
      employmentType,
      locationType,
      location,
      description: description?.trim(),
      salary: parseInt(salary),
      approved: true,
    },
  });

  redirect("/job-submitted");
}
