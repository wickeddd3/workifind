"use server";

import { baseUrl } from "@/lib/baseUrl";
import { toSlug } from "@/lib/utils";
import {
  applyJobSchema,
  createJobSchema,
  CreateJobValues,
} from "@/lib/validation";
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
      minSalary:
        typeof rawData.minSalary === "string" && rawData.minSalary
          ? parseInt(rawData.minSalary)
          : 0,
      maxSalary:
        typeof rawData.maxSalary === "string" && rawData.maxSalary
          ? parseInt(rawData.maxSalary)
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
    const createdJob = await createJob(userId, employer.id, form);

    return createdJob;
  } catch (error) {
    let message = "Unexpected error";
    if (error instanceof Error) {
      message = error.message;
    }
    return { error: message };
  }
}

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
      minSalary:
        typeof rawData.minSalary === "string" && rawData.minSalary
          ? parseInt(rawData.minSalary)
          : 0,
      maxSalary:
        typeof rawData.maxSalary === "string" && rawData.maxSalary
          ? parseInt(rawData.maxSalary)
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
    const updatedJob = await updateJob(userId, jobSlug, form);

    return updatedJob;
  } catch (error) {
    let message = "Unexpected error";
    if (error instanceof Error) {
      message = error.message;
    }
    return { error: message };
  }
}

export async function getEmployerJobs({
  id,
  take,
  skip,
}: {
  id: number;
  take: number;
  skip: number;
}) {
  const params = {
    take: take?.toString() ?? "5",
    skip: skip?.toString() ?? "0",
  };
  const queryParams = new URLSearchParams(params).toString();

  const response = await fetch(
    `${baseUrl}/api/jobs/employer/${id}?${queryParams}`,
  );

  if (response.status === 200) {
    const responseBody = await response.json();
    const { jobs } = responseBody;

    return jobs;
  }

  return null;
}

export async function getEmployerJobsCount(id: number) {
  const response = await fetch(`${baseUrl}/api/jobs/employer/${id}/count`);

  if (response.status === 200) {
    const responseBody = await response.json();
    const { jobsCount } = responseBody;
    return jobsCount;
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
    const deletedJob = await deleteJob(userId, jobSlug);

    return deletedJob;
  } catch (error) {
    let message = "Unexpected error";
    if (error instanceof Error) {
      message = error.message;
    }
    return { error: message };
  }
}

export async function getJob(slug: number | string) {
  const response = await fetch(`${baseUrl}/api/jobs/${slug}`);

  if (response.status === 200) {
    const responseBody = await response.json();
    const { job } = responseBody;

    return job;
  }

  return null;
}

export async function applyToJob(
  applicantId: number,
  jobId: number,
  formData: FormData,
  role: string,
  slug: string,
): Promise<FormState> {
  try {
    // Check userId
    if (!applicantId)
      return { error: "Applicant ID missing, not authenticated" };

    // Check jobId
    if (!jobId) return { error: "Job ID missing" };

    // Check role
    if (role !== "APPLICANT")
      return { error: "Role not allowed to apply to the job" };

    // Get form data value
    const rawData = Object.fromEntries(formData.entries());

    // Validate form data value
    const parsedData = applyJobSchema.safeParse(rawData);
    if (!parsedData.success) {
      console.error("Validation Errors:", parsedData.error.format());
      return { error: "Validation failed" };
    }
    const validatedData = parsedData.data;

    // Save job application
    const response = await fetch(`${baseUrl}/api/jobs/${slug}/apply`, {
      method: "POST",
      body: JSON.stringify({ applicantId, jobId, form: validatedData }),
    });

    // Return saved job application
    if (response.status === 200) {
      const responseBody = await response.json();
      const { jobApplication } = responseBody;

      return jobApplication;
    }
  } catch (error) {
    let message = "Unexpected error";
    if (error instanceof Error) {
      message = error.message;
    }
    return { error: message };
  }
}

export async function saveJob(
  applicantId: number | undefined,
  jobId: number,
  role: string | undefined,
  slug: string,
): Promise<FormState> {
  try {
    // Check userId
    if (!applicantId)
      return { error: "Applicant ID missing, not authenticated" };

    // Check jobId
    if (!jobId) return { error: "Job ID missing" };

    // Check role
    if (role !== "APPLICANT")
      return { error: "Role not allowed to save the job" };

    // Save job application
    const response = await fetch(`${baseUrl}/api/jobs/${slug}/save`, {
      method: "POST",
      body: JSON.stringify({ applicantId, jobId }),
    });

    // Return saved job application
    if (response.status === 200) {
      const responseBody = await response.json();
      const { savedJob } = responseBody;

      return savedJob;
    }
  } catch (error) {
    let message = "Unexpected error";
    if (error instanceof Error) {
      message = error.message;
    }
    return { error: message };
  }
}

export async function unsaveJob(
  applicantId: number | undefined,
  jobId: number,
  role: string | undefined,
  slug: string,
): Promise<FormState> {
  try {
    // Check userId
    if (!applicantId)
      return { error: "Applicant ID missing, not authenticated" };

    // Check jobId
    if (!jobId) return { error: "Job ID missing" };

    // Check role
    if (role !== "APPLICANT")
      return { error: "Role not allowed to unsave job" };

    // Save job application
    const response = await fetch(`${baseUrl}/api/jobs/${slug}/unsave`, {
      method: "POST",
      body: JSON.stringify({ applicantId, jobId }),
    });

    // Return unsaved job application
    if (response.status === 200) {
      const responseBody = await response.json();
      const { unsavedJob } = responseBody;

      return unsavedJob;
    }
  } catch (error) {
    let message = "Unexpected error";
    if (error instanceof Error) {
      message = error.message;
    }
    return { error: message };
  }
}
