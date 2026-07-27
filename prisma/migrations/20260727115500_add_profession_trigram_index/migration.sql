-- Professional search filters with `profession: { contains, mode: "insensitive" }`,
-- which Prisma compiles to `"profession" ILIKE '%q%'`. A leading wildcard makes
-- that unservable by a B-tree, so it degrades to a sequential scan. A trigram
-- GIN index is the one index type Postgres can use for an unanchored ILIKE.
--
-- Written as a raw migration because Prisma's `@@index` cannot express an
-- operator class (`gin_trgm_ops`).

CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE INDEX "applicants_profession_trgm_idx"
  ON "applicants" USING GIN ("profession" gin_trgm_ops);
