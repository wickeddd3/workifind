-- Hand-edited after generation.
--
-- `prisma migrate dev` also emitted four statements against objects the Prisma
-- schema cannot express, and so reads as drift:
--
--   DROP INDEX "applicants_profession_trgm_idx";
--   DROP INDEX "jobs_location_trgm_idx";
--   DROP INDEX "jobs_searchVector_idx";
--   ALTER TABLE "jobs" ALTER COLUMN "searchVector" DROP DEFAULT;
--
-- The first three are the trigram and GIN indexes added by earlier raw-SQL
-- migrations; the fourth is Postgres reporting the generated column's
-- expression as a default, and it fails outright (42601 — a generated column
-- has no default to drop). All four are removed here. Anything generated
-- against this schema in future will re-emit them and must do the same.

-- CreateTable
CREATE TABLE "applicantExperiences" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "employmentType" TEXT,
    "location" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "current" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT,
    "applicantId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "applicantExperiences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "applicantEducations" (
    "id" SERIAL NOT NULL,
    "school" TEXT NOT NULL,
    "degree" TEXT,
    "fieldOfStudy" TEXT,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "current" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT,
    "applicantId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "applicantEducations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "applicantCertifications" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "issuer" TEXT,
    "issueDate" TIMESTAMP(3),
    "expiryDate" TIMESTAMP(3),
    "credentialId" TEXT,
    "credentialUrl" TEXT,
    "applicantId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "applicantCertifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "applicantExperiences_applicantId_current_startDate_idx" ON "applicantExperiences"("applicantId", "current" DESC, "startDate" DESC);

-- CreateIndex
CREATE INDEX "applicantEducations_applicantId_current_startDate_idx" ON "applicantEducations"("applicantId", "current" DESC, "startDate" DESC);

-- CreateIndex
CREATE INDEX "applicantCertifications_applicantId_issueDate_idx" ON "applicantCertifications"("applicantId", "issueDate" DESC);

-- AddForeignKey
ALTER TABLE "applicantExperiences" ADD CONSTRAINT "applicantExperiences_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "applicants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applicantEducations" ADD CONSTRAINT "applicantEducations_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "applicants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applicantCertifications" ADD CONSTRAINT "applicantCertifications_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "applicants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
