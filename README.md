# WorkiFind

A job search and recruitment platform built with **Next.js 14** (App Router),
**Prisma**, and **PostgreSQL**.

WorkiFind bridges the gap between talent and opportunity: job seekers discover
roles and track applications, employers post jobs and manage candidate
pipelines.

## 🚀 Core Features

- **Dual-role architecture** — separate journeys for applicants (job search,
  saved jobs, application tracking) and employers (job posting, received
  applications). A stepped setup wizard at `/setup` picks the role and builds
  the profile; `middleware.ts` gates the role-owned routes.
- **Job search on Postgres full text** — search runs against a `searchVector`
  generated column backed by a GIN index, with trigram indexes on profession,
  industry, and location. Filters (keyword, location, employment type, salary,
  on-site/remote, industry) and sorting are URL-driven, so results are
  shareable and back-navigable.
- **Companies and professionals directories** — both searchable on the same
  layout as the jobs page. The professionals directory is open to every
  visitor; how much of a profile comes back depends on who is reading it
  (`profileVisibility` in the applicant entity redacts contact details and
  photos from signed-out visitors).
- **Applicant profiles** — experience, education, skills, languages,
  preferred locations, and certifications, each stored as rows rather than
  free text so they stay queryable.
- **File uploads with progress** — avatars, company logos, and résumés go
  through API routes to Vercel Blob. The route hands back a signed reference
  that the save action redeems, so a client cannot name an arbitrary URL as
  its résumé. Résumé downloads are served through authorized routes only.
- **Authentication** — Clerk v6, with `clerkMiddleware` protecting
  `/applicant`, `/employer`, `/setup`, and `/account`.
- **Responsive UI** — Tailwind CSS and shadcn/ui, dark mode first.

---

## 🧱 Architecture

The `src` tree follows **Feature-Sliced Design**. A layer may import only from
layers below it — never sideways, never up. ESLint enforces this via the
`no-restricted-imports` overrides in `.eslintrc.json`.

| Layer      | Directory      | Holds                                            |
| ---------- | -------------- | ------------------------------------------------ |
| `app`      | `src/app`      | Next routes, metadata, layouts — routing only    |
| `pages`    | `src/views`    | One slice per route, composing widgets/features  |
| `widgets`  | `src/widgets`  | Self-contained blocks used by two or more pages  |
| `features` | `src/features` | User-facing operations (server actions, filters) |
| `entities` | `src/entities` | Domain records: types, queries, presentation     |
| `shared`   | `src/shared`   | Framework/UI primitives with no domain knowledge |

Slices are imported through their public API (`index.ts`), never their
internal segments. Slices used from the browser also expose `client.ts` (the
browser-safe subset) and sometimes `queries.ts` (data only, no UI) so a route
that needs one query does not pull a slice's component tree into its bundle.

Full rules: [context/coding-standards.md](context/coding-standards.md).

---

## 🚦 Installation & Setup

### Prerequisites

- Docker & Docker Compose
- Node.js 22+
- A [Clerk](https://clerk.com/) application
- A [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) store (for
  uploads)

### 1. Clone

```bash
git clone https://github.com/wickeddd3/workifind.git
cd workifind
```

### 2. Configure the environment

Create `.env` in the project root from `.env.example`:

| Variable                            | Purpose                                            |
| ----------------------------------- | -------------------------------------------------- |
| `NEXT_PUBLIC_API_BASE_URL`          | Origin the browser calls the API routes on         |
| `POSTGRES_URL`                      | Pooled connection string                           |
| `POSTGRES_URL_NON_POOLING`          | Direct connection, used by Prisma Migrate          |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk frontend key                                 |
| `CLERK_SECRET_KEY`                  | Clerk backend key                                  |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL`     | `/sign-up`                                         |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL`     | `/sign-in`                                         |
| `NEXT_CLERK_SIGN_UP_FALLBACK_URL`   | `/`                                                |
| `NEXT_CLERK_SIGN_IN_FALLBACK_URL`   | `/`                                                |
| `BLOB_READ_WRITE_TOKEN`             | Vercel Blob token; without it every upload fails   |
| `UPLOAD_SIGNING_SECRET`             | Signs upload references. `openssl rand -base64 32` |

`SEED_USER_PASSWORD` is read only by the seeder (see below) and is not in
`.env.example`.

### 3. Start the stack

```bash
docker-compose up --build
```

This brings up:

| Service   | URL / Port                                     |
| --------- | ---------------------------------------------- |
| `app`     | http://localhost:3000                          |
| `db`      | `localhost:5433` → Postgres 15 (`root`/`root`) |
| `pgadmin` | http://localhost:5050 (`root@root.com`/`root`) |

Postgres publishes **5433** on the host so it can run alongside other local
projects on 5432; containers still reach it at `db:5432`.

The `app` container runs `prisma generate && prisma migrate deploy && npm run
dev` on start, so the schema is already applied when the dev server comes up.

### 4. Seed sample data

Seeding creates Clerk users, so it needs live Clerk keys in `.env`. Set
`SEED_USER_PASSWORD` to choose the password those accounts get; it falls back
to a built-in test password when unset.

```bash
npm run seed             # employers, applicants, jobs, applications
npm run seed:clean       # remove seeded rows, leave Clerk users
npm run seed:clean-all   # also delete the seeded Clerk users
npm run seed:clean-orphans  # delete Clerk users with no matching row
```

`seed:clean` deliberately leaves Clerk accounts alone — the Clerk instance is
shared with production.

---

## 📜 Scripts

```bash
npm run dev          # Next dev server
npm run build        # prisma generate && next build (also type-checks)
npm run start        # serve the production build
npm run lint         # ESLint (includes the FSD import rules)
npm run lintfix      # ESLint --fix
npm run db:migrate   # prisma migrate dev — create/apply a migration locally
npm run db:deploy    # prisma migrate deploy — apply committed migrations
npm run backfill:roles  # one-off: backfill Clerk user roles
```

Bundle analysis:

```bash
ANALYZE=true npm run build   # writes analyze/nodejs.html
```

---

## 🗄️ Database

- Prisma is the only database access path; server components query it
  directly, client components go through server actions.
- Schema changes use `prisma migrate dev`, never `db push`. Run
  `npx prisma migrate status` before committing.
- Production deploys run `prisma migrate deploy` before the app starts.

> **Caveat when generating a migration.** The trigram/GIN indexes and the
> `searchVector` generated column are raw SQL that Prisma's schema does not
> model. Every generated migration will therefore contain statements dropping
> them — delete those statements by hand before committing, or job search
> loses its indexes.

Core models: `Employer`, `Applicant` (plus `ApplicantExperience`,
`ApplicantEducation`, `ApplicantSkill`, `ApplicantLanguage`,
`ApplicantPreferredLocation`, `ApplicantCertification`), `Job`,
`JobApplication`, `SavedJob`.

---

## 🌐 API routes

Most mutations are server actions. API routes exist only where the platform
requires them — uploads with progress, and authorized file downloads.

| Route                               | Method | Purpose                               |
| ----------------------------------- | ------ | ------------------------------------- |
| `/api/health`                       | GET    | Container healthcheck                 |
| `/api/applicants/avatar`            | POST   | Upload an applicant photo             |
| `/api/applicants/resume`            | POST   | Upload a résumé                       |
| `/api/employers/logo`               | POST   | Upload a company logo                 |
| `/api/applicants/[id]/resume`       | GET    | Download a résumé (owner or employer) |
| `/api/job-applications/[id]/resume` | GET    | Résumé attached to an application     |

Blobs are stored with public access, so their URLs are permanent bearer tokens
for personal data. These download routes exist so that URL never leaves the
server: the browser gets a path re-authorized on every request, and both routes
answer `404` rather than `403` so an unauthorized caller cannot learn whether a
résumé exists.

---

## ✅ Testing

End-to-end tests run on Playwright against `http://localhost:3000`, so start
the app first.

```bash
npx playwright test                      # run the suite
npx playwright test --ui                 # interactive UI mode
npx playwright test --project=chromium   # Desktop Chrome only
npx playwright test home-page            # a single spec
npx playwright test --debug              # debug mode
npx playwright codegen                   # record a new test
```

Specs live in `tests/e2e/specs`, with page objects in `tests/e2e/pages`.

---

## 🚢 Deployment

`.github/workflows/deploy.yml` runs on every push and pull request:

1. **validate** — `npm ci`, `npm run lint`, `npm run build` (which type-checks
   and validates the Prisma schema).
2. **deploy** — on pushes to `main` only, after validate passes: applies
   `prisma migrate deploy`, then deploys to Vercel through the Vercel CLI.

GitHub secrets are the single source of truth for environment variables — the
Vercel project itself holds none. The workflow passes each one twice, via
`--build-env` for the build and `--env` for the running functions. **A
deployment triggered anywhere else (a dashboard redeploy, Vercel's git
integration, a preview build) gets an empty environment and fails.** Adding a
variable means adding it to `deploy_vars` in the workflow, not just to the
dashboard.

The `Dockerfile` builds a standalone production image (`node:22-alpine`,
multi-stage); `docker-compose` targets its `deps` stage for local development.
