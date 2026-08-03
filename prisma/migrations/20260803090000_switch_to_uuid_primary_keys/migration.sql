-- Hand-edited after generation, as every migration in this repo must be.
--
-- `prisma migrate diff` re-emitted the statements it always does against the
-- objects the Prisma schema cannot express — the trigram and GIN indexes, and
-- the jobs.searchVector generated column, whose `DROP DEFAULT` fails outright
-- with 42601. All four are removed here. See the
-- 20260802100708_add_applicant_experience_education_certifications migration.
--
-- The type change itself is not destructive: Postgres casts the existing
-- integer ids to their text form, so '4' stays joined to '4' and no row is
-- lost. Those rows keep their old sequential ids as text, though — only rows
-- inserted after this point get a uuid default. Re-seed to replace them.

-- DropForeignKey
ALTER TABLE "applicantCertifications" DROP CONSTRAINT "applicantCertifications_applicantId_fkey";

-- DropForeignKey
ALTER TABLE "applicantEducations" DROP CONSTRAINT "applicantEducations_applicantId_fkey";

-- DropForeignKey
ALTER TABLE "applicantExperiences" DROP CONSTRAINT "applicantExperiences_applicantId_fkey";

-- DropForeignKey
ALTER TABLE "jobApplications" DROP CONSTRAINT "jobApplications_applicantId_fkey";

-- DropForeignKey
ALTER TABLE "jobApplications" DROP CONSTRAINT "jobApplications_jobId_fkey";

-- DropForeignKey
ALTER TABLE "jobs" DROP CONSTRAINT "jobs_employerId_fkey";

-- DropForeignKey
ALTER TABLE "savedJobs" DROP CONSTRAINT "savedJobs_applicantId_fkey";

-- DropForeignKey
ALTER TABLE "savedJobs" DROP CONSTRAINT "savedJobs_jobId_fkey";

-- AlterTable
ALTER TABLE "applicantCertifications" DROP CONSTRAINT "applicantCertifications_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "applicantId" SET DATA TYPE TEXT,
ADD CONSTRAINT "applicantCertifications_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "applicantCertifications_id_seq";

-- AlterTable
ALTER TABLE "applicantEducations" DROP CONSTRAINT "applicantEducations_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "applicantId" SET DATA TYPE TEXT,
ADD CONSTRAINT "applicantEducations_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "applicantEducations_id_seq";

-- AlterTable
ALTER TABLE "applicantExperiences" DROP CONSTRAINT "applicantExperiences_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "applicantId" SET DATA TYPE TEXT,
ADD CONSTRAINT "applicantExperiences_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "applicantExperiences_id_seq";

-- AlterTable
ALTER TABLE "applicants" DROP CONSTRAINT "applicants_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "applicants_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "applicants_id_seq";

-- AlterTable
ALTER TABLE "employers" DROP CONSTRAINT "employers_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "employers_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "employers_id_seq";

-- AlterTable
ALTER TABLE "jobApplications" DROP CONSTRAINT "jobApplications_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "applicantId" SET DATA TYPE TEXT,
ALTER COLUMN "jobId" SET DATA TYPE TEXT,
ADD CONSTRAINT "jobApplications_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "jobApplications_id_seq";

-- AlterTable
ALTER TABLE "jobs" DROP CONSTRAINT "jobs_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "employerId" SET DATA TYPE TEXT,
ADD CONSTRAINT "jobs_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "jobs_id_seq";

-- AlterTable
ALTER TABLE "savedJobs" DROP CONSTRAINT "savedJobs_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "applicantId" SET DATA TYPE TEXT,
ALTER COLUMN "jobId" SET DATA TYPE TEXT,
ADD CONSTRAINT "savedJobs_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "savedJobs_id_seq";

-- AddForeignKey
ALTER TABLE "applicantExperiences" ADD CONSTRAINT "applicantExperiences_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "applicants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applicantEducations" ADD CONSTRAINT "applicantEducations_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "applicants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applicantCertifications" ADD CONSTRAINT "applicantCertifications_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "applicants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_employerId_fkey" FOREIGN KEY ("employerId") REFERENCES "employers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobApplications" ADD CONSTRAINT "jobApplications_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "applicants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobApplications" ADD CONSTRAINT "jobApplications_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "jobs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "savedJobs" ADD CONSTRAINT "savedJobs_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "applicants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "savedJobs" ADD CONSTRAINT "savedJobs_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "jobs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

