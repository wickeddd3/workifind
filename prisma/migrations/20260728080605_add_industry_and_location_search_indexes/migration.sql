-- Hand-edited. `prisma migrate dev --create-only` additionally proposed
-- dropping "applicants_profession_trgm_idx" and "jobs_searchVector_idx", and
-- dropping the default on "jobs"."searchVector". Those are not drift: they are
-- the raw trigram and tsvector objects earlier migrations added deliberately,
-- and Prisma proposes removing them on every diff because `@@index` cannot
-- express an operator class and `Unsupported` columns carry no default in the
-- schema. Applying that would have silently deleted both search indexes.
--
-- Only the two additions below are intended.

-- Job search filters by the employer's industry through the relation, so the
-- planner needs to narrow employers before the join rather than scanning them.
CREATE INDEX "employers_industry_idx" ON "employers" ("industry");

-- The location filter is `contains` + `mode: "insensitive"`, which Prisma
-- compiles to `"location" ILIKE '%q%'`. The leading wildcard makes that
-- unservable by a B-tree, so it degrades to a sequential scan; a trigram GIN
-- index is the one index type Postgres can use for an unanchored ILIKE. Same
-- reasoning, and same shape, as applicants_profession_trgm_idx.
CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE INDEX "jobs_location_trgm_idx"
  ON "jobs" USING GIN ("location" gin_trgm_ops);
