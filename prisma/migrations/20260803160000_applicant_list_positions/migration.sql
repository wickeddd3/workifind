-- Hand-edited after generation: the usual four statements against the trigram
-- and GIN indexes and the jobs.searchVector generated column are removed, and
-- the backfill below is added.
--
-- These three lists had no column recording their order. They were read back
-- ordered by `createdAt`, which cannot carry it: a section save rewrites the
-- whole set in one statement, so every row takes the same transaction-start
-- timestamp, and the tiebreak fell through to a random uuid. Adding a skill
-- therefore reshuffled the list.
--
-- Existing rows have no recorded order to recover, so the backfill freezes
-- whatever order they currently read in rather than inventing a new one — the
-- point is that it stops moving, not that it was ever right.

-- AlterTable
ALTER TABLE "applicant_skills" ADD COLUMN "position" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "applicant_languages" ADD COLUMN "position" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "applicant_preferred_locations" ADD COLUMN "position" INTEGER NOT NULL DEFAULT 0;

-- Backfill: number each applicant's rows in the order they currently sort by.
UPDATE "applicant_skills" s
SET "position" = ordered.rn
FROM (
    SELECT "id", row_number() OVER (
        PARTITION BY "applicantId" ORDER BY "createdAt", "id"
    ) - 1 AS rn
    FROM "applicant_skills"
) AS ordered
WHERE s."id" = ordered."id";

UPDATE "applicant_languages" l
SET "position" = ordered.rn
FROM (
    SELECT "id", row_number() OVER (
        PARTITION BY "applicantId" ORDER BY "createdAt", "id"
    ) - 1 AS rn
    FROM "applicant_languages"
) AS ordered
WHERE l."id" = ordered."id";

UPDATE "applicant_preferred_locations" p
SET "position" = ordered.rn
FROM (
    SELECT "id", row_number() OVER (
        PARTITION BY "applicantId" ORDER BY "createdAt", "id"
    ) - 1 AS rn
    FROM "applicant_preferred_locations"
) AS ordered
WHERE p."id" = ordered."id";

-- DropIndex
DROP INDEX "applicant_skills_applicantId_idx";

-- DropIndex
DROP INDEX "applicant_languages_applicantId_idx";

-- DropIndex
DROP INDEX "applicant_preferred_locations_applicantId_idx";

-- CreateIndex
CREATE INDEX "applicant_skills_applicantId_position_idx" ON "applicant_skills"("applicantId", "position");

-- CreateIndex
CREATE INDEX "applicant_languages_applicantId_position_idx" ON "applicant_languages"("applicantId", "position");

-- CreateIndex
CREATE INDEX "applicant_preferred_locations_applicantId_position_idx" ON "applicant_preferred_locations"("applicantId", "position");
