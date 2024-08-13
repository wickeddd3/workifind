import { baseUrl } from "@/lib/baseUrl";
import { toSlug } from "@/lib/utils";
import { createJobSchema, CreateJobValues } from "@/lib/validation";
import { nanoid } from "nanoid";
import { getEmployer } from "@/actions/employers";

type FormState = { error?: string } | undefined;

export async function createJob(
  authorId: number | string,
  employerId: number | string,
  form: CreateJobValues,
) {
  const response = await fetch(`${baseUrl}/api/jobs/create`, {
    method: "POST",
    body: JSON.stringify({ authorId, employerId, form }),
  });

  if (response.status === 200) {
    const responseBody = await response.json();
    const { job } = responseBody;

    return job;
  }

  return null;
}

export async function createJobPost(
  userId: number,
  formData: FormData,
): Promise<FormState> {
  try {
    // Get employer ID using user ID
    const employer = await getEmployer(userId);
    if (!employer) return { error: "Employer profile missing" };

    // Get form data value
    const rawData = Object.fromEntries(formData.entries());

    // Transform form data
    const transformedData = {
      ...rawData,
      salaryStart:
        typeof rawData.salaryStart === "string" && rawData.salaryStart
          ? parseInt(rawData.salaryStart)
          : 0,
      salaryEnd:
        typeof rawData.salaryEnd === "string" && rawData.salaryEnd
          ? parseInt(rawData.salaryEnd)
          : 0,
    };

    // Validate form data value
    const parsedData = createJobSchema.safeParse(transformedData);
    if (!parsedData.success) {
      console.error("Validation Errors:", parsedData.error.format());
      return { error: "Validation failed" };
    }
    const validatedData = parsedData.data;

    // Create slug based on job title
    const slug = `${toSlug(validatedData.title)}-${nanoid(10)}`;

    // Prepare form data
    const form = {
      ...validatedData,
      slug,
      title: validatedData.title?.trim(),
      location: validatedData.location?.trim(),
      description: validatedData.description?.trim(),
    };

    // Create job post
    await createJob(userId, employer.id, form);
export async function updateJob(
  id: number | string,
  slug: number | string,
  form: CreateJobValues,
) {
  const response = await fetch(`${baseUrl}/api/jobs/employer/${id}/${slug}`, {
    method: "PUT",
    body: JSON.stringify({ form }),
  });

  if (response.status === 200) {
    const responseBody = await response.json();
    const { job } = responseBody;

    return job;
  }

  return null;
}

export async function updateJobPost(
  userId: number,
  jobSlug: string,
  formData: FormData,
): Promise<FormState> {
  try {
    // Check userId
    if (!userId) return { error: "User ID missing, not authenticated" };

    // Check job post slug
    if (!jobSlug) return { error: "Job post slug missing" };

    // Get form data value
    const rawData = Object.fromEntries(formData.entries());

    // Transform form data
    const transformedData = {
      ...rawData,
      salaryStart:
        typeof rawData.salaryStart === "string" && rawData.salaryStart
          ? parseInt(rawData.salaryStart)
          : 0,
      salaryEnd:
        typeof rawData.salaryEnd === "string" && rawData.salaryEnd
          ? parseInt(rawData.salaryEnd)
          : 0,
    };

    // Validate form data value
    const parsedData = createJobSchema.safeParse(transformedData);
    if (!parsedData.success) {
      console.error("Validation Errors:", parsedData.error.format());
      return { error: "Validation failed" };
    }
    const validatedData = parsedData.data;

    // Create slug based on job title
    const slug = `${toSlug(validatedData.title)}-${nanoid(10)}`;

    // Prepare form data
    const form = {
      ...validatedData,
      slug,
      title: validatedData.title?.trim(),
      location: validatedData.location?.trim(),
      description: validatedData.description?.trim(),
    };

    // Update job post
    await updateJob(userId, jobSlug, form);

    // Redirect to employer jobs page
    revalidatePath("/employer/jobs");
  } catch (error) {
    let message = "Unexpected error";
    if (error instanceof Error) {
      message = error.message;
    }
    return { error: message };
  }
}

export async function getEmployerJobs(id: number) {
  const response = await fetch(`${baseUrl}/api/jobs/employer/${id}`);

  if (response.status === 200) {
    const responseBody = await response.json();
    const { jobs } = responseBody;

    return jobs;
  }

  return null;
}

export async function getEmployerJob(
  id: number | string,
  slug: number | string,
) {
  const response = await fetch(`${baseUrl}/api/jobs/employer/${id}/${slug}`);

  if (response.status === 200) {
    const responseBody = await response.json();
    const { job } = responseBody;

    return job;
  }

  return null;
}

export async function deleteJob(id: number | string, slug: number | string) {
  const response = await fetch(`${baseUrl}/api/jobs/employer/${id}/${slug}`, {
    method: "DELETE",
  });

  if (response.status === 200) {
    const responseBody = await response.json();
    const { job } = responseBody;

    return job;
  }

  return null;
}

export async function deleteJobPost(
  userId: number | string,
  jobSlug: number | string,
) {
  try {
    // Check userId
    if (!userId) return { error: "User ID missing, not authenticated" };

    // Check job post slug
    if (!jobSlug) return { error: "Job post slug missing" };

    // Delete job
    await deleteJob(userId, jobSlug);
    revalidatePath("/employer/jobs");
  } catch (error) {
    let message = "Unexpected error";
    if (error instanceof Error) {
      message = error.message;
    }
    return { error: message };
  }
}
