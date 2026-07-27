-- Job search previously used Prisma's `search` filter, which compiles to
--
--   to_tsvector(concat_ws(' ', "location", "title")) @@ to_tsquery($1)
--
-- Postgres cannot index that expression: single-argument to_tsvector depends on
-- default_text_search_config and concat_ws performs type coercion, so both are
-- STABLE rather than IMMUTABLE. Every search therefore scanned the whole table
-- and recomputed to_tsvector per row.
--
-- A stored generated column sidesteps it by pinning the text search config and
-- using `||` instead of concat_ws, which makes the whole expression IMMUTABLE
-- and therefore indexable. Postgres maintains the column on insert and update.

ALTER TABLE "jobs" ADD COLUMN "searchVector" tsvector
  GENERATED ALWAYS AS (
    to_tsvector('english', coalesce("title", '') || ' ' || coalesce("location", ''))
  ) STORED;

CREATE INDEX "jobs_searchVector_idx" ON "jobs" USING GIN ("searchVector");
