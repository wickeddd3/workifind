-- Hand-written rather than generated: `prisma migrate dev` cannot see the
-- tsvector column or the trigram indexes from add_job_search_vector and emits
-- DROP statements for them in every migration it produces.

-- The applicant's current résumé.
ALTER TABLE "applicants"
  ADD COLUMN "resumeUrl" TEXT,
  ADD COLUMN "resumeName" TEXT,
  ADD COLUMN "resumeUploadedAt" TIMESTAMP(3);

-- The résumé as sent with one application. A copy of the columns above, not a
-- foreign key: replacing the profile résumé must leave applications already
-- filed showing the document the employer actually received.
ALTER TABLE "job_applications"
  ADD COLUMN "resumeUrl" TEXT,
  ADD COLUMN "resumeName" TEXT;
