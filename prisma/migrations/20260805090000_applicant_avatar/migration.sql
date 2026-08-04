-- Hand-written rather than generated, for the reason the résumé migration gives:
-- `prisma migrate dev` cannot see the tsvector column or the trigram indexes
-- from add_job_search_vector and emits DROP statements for them in every
-- migration it produces.

-- The applicant's profile picture. Employers already have `companyLogoUrl`;
-- this is the same thing on the other side of the directory, and it is stored
-- as a blob URL rather than read from Clerk so a server-rendered list of
-- candidates does not cost one Clerk lookup per row.
ALTER TABLE "applicants"
  ADD COLUMN "avatarUrl" TEXT;
