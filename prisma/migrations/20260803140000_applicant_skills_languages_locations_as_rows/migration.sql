-- Hand-edited after generation.
--
-- `prisma migrate diff` drops the three Json columns and creates the three
-- tables, in that order and with nothing in between, which throws away every
-- skill, language and preferred location on the instance. The generated
-- statements are reordered here so the tables exist first, the rows are copied
-- across, and only then are the columns dropped.
--
-- It also re-emitted the usual drops against the trigram and GIN indexes and
-- the jobs.searchVector generated column. Those are removed — see the
-- 20260802100708 migration for why they keep coming back.
--
-- On the decoding below: the columns hold a Json *array of strings*, each string
-- being an encoded object — `["{\"name\":\"React\"}", ...]` — because the app
-- serialized each entry with JSON.stringify before storing the array. So each
-- element is unwrapped to text with `#>>'{}'` and then parsed as json a second
-- time to reach `name`. The `jsonb_typeof` guard tolerates the other shape the
-- reader also accepted, a bare object, in case any row was written that way.

-- CreateTable
CREATE TABLE "applicant_skills" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "level" TEXT,
    "years" INTEGER,
    "applicantId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "applicant_skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "applicant_languages" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "proficiency" TEXT,
    "applicantId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "applicant_languages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "applicant_preferred_locations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "applicantId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "applicant_preferred_locations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "applicant_skills_applicantId_idx" ON "applicant_skills"("applicantId");

-- CreateIndex
CREATE INDEX "applicant_skills_name_idx" ON "applicant_skills"("name");

-- CreateIndex
CREATE INDEX "applicant_languages_applicantId_idx" ON "applicant_languages"("applicantId");

-- CreateIndex
CREATE INDEX "applicant_preferred_locations_applicantId_idx" ON "applicant_preferred_locations"("applicantId");

-- AddForeignKey
ALTER TABLE "applicant_skills" ADD CONSTRAINT "applicant_skills_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "applicants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applicant_languages" ADD CONSTRAINT "applicant_languages_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "applicants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applicant_preferred_locations" ADD CONSTRAINT "applicant_preferred_locations_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "applicants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Backfill: Json entries -> rows. Must run before the columns are dropped.
INSERT INTO "applicant_skills" ("id", "name", "applicantId", "createdAt", "updatedAt")
SELECT
    gen_random_uuid()::text,
    entry.name,
    a."id",
    a."createdAt",
    a."updatedAt"
FROM "applicants" a
CROSS JOIN LATERAL jsonb_array_elements(a."skills") AS element
CROSS JOIN LATERAL (
    SELECT CASE jsonb_typeof(element)
        WHEN 'string' THEN ((element #>> '{}')::jsonb) ->> 'name'
        ELSE element ->> 'name'
    END AS name
) AS entry
WHERE jsonb_typeof(a."skills") = 'array'
  AND entry.name IS NOT NULL
  AND btrim(entry.name) <> '';

INSERT INTO "applicant_languages" ("id", "name", "applicantId", "createdAt", "updatedAt")
SELECT
    gen_random_uuid()::text,
    entry.name,
    a."id",
    a."createdAt",
    a."updatedAt"
FROM "applicants" a
CROSS JOIN LATERAL jsonb_array_elements(a."languages") AS element
CROSS JOIN LATERAL (
    SELECT CASE jsonb_typeof(element)
        WHEN 'string' THEN ((element #>> '{}')::jsonb) ->> 'name'
        ELSE element ->> 'name'
    END AS name
) AS entry
WHERE jsonb_typeof(a."languages") = 'array'
  AND entry.name IS NOT NULL
  AND btrim(entry.name) <> '';

INSERT INTO "applicant_preferred_locations" ("id", "name", "applicantId", "createdAt", "updatedAt")
SELECT
    gen_random_uuid()::text,
    entry.name,
    a."id",
    a."createdAt",
    a."updatedAt"
FROM "applicants" a
CROSS JOIN LATERAL jsonb_array_elements(a."preferredLocations") AS element
CROSS JOIN LATERAL (
    SELECT CASE jsonb_typeof(element)
        WHEN 'string' THEN ((element #>> '{}')::jsonb) ->> 'name'
        ELSE element ->> 'name'
    END AS name
) AS entry
WHERE jsonb_typeof(a."preferredLocations") = 'array'
  AND entry.name IS NOT NULL
  AND btrim(entry.name) <> '';

-- AlterTable
ALTER TABLE "applicants" DROP COLUMN "languages",
DROP COLUMN "preferredLocations",
DROP COLUMN "skills";
