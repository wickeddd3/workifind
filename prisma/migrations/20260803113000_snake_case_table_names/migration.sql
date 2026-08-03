-- Written by hand, not generated.
--
-- `prisma migrate diff` renders a table rename as DROP TABLE + CREATE TABLE,
-- which would discard every row in the five tables below — including real job
-- applications and saved jobs. A rename keeps them, so the generated SQL is not
-- used here at all.
--
-- Postgres carries the old index and constraint names through a table rename,
-- and Prisma derives the names it expects from the table name. Leaving them
-- would therefore show as drift on the next migration, so each is renamed
-- alongside its table.
--
-- The three tables already named in lower case — employers, applicants, jobs —
-- need no change. Column names stay camelCase; only the table maps moved.

-- Tables
ALTER TABLE "applicantExperiences" RENAME TO "applicant_experiences";
ALTER TABLE "applicantEducations" RENAME TO "applicant_educations";
ALTER TABLE "applicantCertifications" RENAME TO "applicant_certifications";
ALTER TABLE "jobApplications" RENAME TO "job_applications";
ALTER TABLE "savedJobs" RENAME TO "saved_jobs";

-- Primary keys
ALTER INDEX "applicantExperiences_pkey" RENAME TO "applicant_experiences_pkey";
ALTER INDEX "applicantEducations_pkey" RENAME TO "applicant_educations_pkey";
ALTER INDEX "applicantCertifications_pkey" RENAME TO "applicant_certifications_pkey";
ALTER INDEX "jobApplications_pkey" RENAME TO "job_applications_pkey";
ALTER INDEX "savedJobs_pkey" RENAME TO "saved_jobs_pkey";

-- Secondary indexes
ALTER INDEX "applicantExperiences_applicantId_current_startDate_idx" RENAME TO "applicant_experiences_applicantId_current_startDate_idx";
ALTER INDEX "applicantEducations_applicantId_current_startDate_idx" RENAME TO "applicant_educations_applicantId_current_startDate_idx";
ALTER INDEX "applicantCertifications_applicantId_issueDate_idx" RENAME TO "applicant_certifications_applicantId_issueDate_idx";
ALTER INDEX "jobApplications_userId_jobId_idx" RENAME TO "job_applications_userId_jobId_idx";
ALTER INDEX "jobApplications_jobId_idx" RENAME TO "job_applications_jobId_idx";
ALTER INDEX "jobApplications_applicantId_idx" RENAME TO "job_applications_applicantId_idx";
ALTER INDEX "savedJobs_userId_jobId_idx" RENAME TO "saved_jobs_userId_jobId_idx";
ALTER INDEX "savedJobs_jobId_idx" RENAME TO "saved_jobs_jobId_idx";
ALTER INDEX "savedJobs_applicantId_idx" RENAME TO "saved_jobs_applicantId_idx";

-- Foreign keys
ALTER TABLE "applicant_experiences" RENAME CONSTRAINT "applicantExperiences_applicantId_fkey" TO "applicant_experiences_applicantId_fkey";
ALTER TABLE "applicant_educations" RENAME CONSTRAINT "applicantEducations_applicantId_fkey" TO "applicant_educations_applicantId_fkey";
ALTER TABLE "applicant_certifications" RENAME CONSTRAINT "applicantCertifications_applicantId_fkey" TO "applicant_certifications_applicantId_fkey";
ALTER TABLE "job_applications" RENAME CONSTRAINT "jobApplications_applicantId_fkey" TO "job_applications_applicantId_fkey";
ALTER TABLE "job_applications" RENAME CONSTRAINT "jobApplications_jobId_fkey" TO "job_applications_jobId_fkey";
ALTER TABLE "saved_jobs" RENAME CONSTRAINT "savedJobs_applicantId_fkey" TO "saved_jobs_applicantId_fkey";
ALTER TABLE "saved_jobs" RENAME CONSTRAINT "savedJobs_jobId_fkey" TO "saved_jobs_jobId_fkey";
