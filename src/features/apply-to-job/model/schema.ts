import { z } from "zod";

// From `client`, not the full barrel: `ApplicationForm` is `"use client"` and
// imports this file, so the barrel's query re-exports would put PrismaClient in
// the browser bundle.
import { ResumeUploadSchema } from "@/entities/applicant/client";

export const JobApplicationSchema = z.object({
  pitch: z
    .string()
    .min(
      200,
      "Explain why you are suitable for this role using minimum of 200 characters",
    )
    .max(
      2000,
      "Explain why you are suitable for this role using maximum of 2000 characters",
    ),
  /**
   * A résumé for this application in particular — the signed reference the
   * upload route issued, not the file.
   *
   * Optional, and empty is the ordinary case: leaving it alone sends whatever
   * is on the profile. It exists because a CV tailored to one role is a real
   * thing people send, and because an applicant with nothing on file should be
   * able to attach one here rather than be sent off to the profile editor
   * halfway through applying.
   */
  resumeToken: ResumeUploadSchema,
});

export type JobApplicationSchemaType = z.infer<typeof JobApplicationSchema>;
