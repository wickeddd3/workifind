# WorkiFind

A high-performance job search and recruitment platform built with **Next.js 14**, **Prisma**, and **PostgreSQL**.

WorkiFind bridges the gap between talent and opportunity by providing a seamless interface for job seekers to discover roles and for employers to manage candidate pipelines.

## 🚀 Core Features

- **Dual-Role Architecture:** Dedicated dashboards for Job Seekers (application tracking) and Employers (job posting & candidate management).
- **Advanced Search & Filtering:** Real-time filtering by category, salary range, and job type using optimized database queries.
- **Resume Management:** Secure file handling for candidate profiles.
- **Authentication:** Full-stack auth integrated with **Clerk**, supporting multi-tenant roles.
- **Responsive UI:** Built with **Tailwind CSS** and **Shadcn/UI** for a mobile-first experience.

---

## 🚦 Installation & Setup

### Prerequisites

- Docker & Docker Compose
- Node.js 20+
- [Clerk Auth](https://clerk.com/)

### Local Development

1. Clone the repository:

   ```bash
   git clone [https://github.com/wickeddd3/workifind.git](https://github.com/wickeddd3/workifind.git)
   ```

2. Environment Configuration

You need to create .env file in root dir based on .env.example

```
#PostgreSQL Database
POSTGRES_URL=
POSTGRES_URL_NON_POOLING=

#Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_CLERK_SIGN_UP_FALLBACK_URL=/
NEXT_CLERK_SIGN_IN_FALLBACK_URL=/
```

3. Spin up the infrastructure:

```
docker-compose up --build
```

4. Push the schema to your local PostgreSQL:

```
# Will execute npx prisma db push in app (form-builder docker container)
docker-compose exec -it app npx prisma db push
```

### Prisma scripts

```bash
# sync prisma schema to your db
npx prisma db push

# update your @prisma/client (run this everytime you update your prisma schema)
npx prisma generate
```

### Playwright scripts

```bash
# Runs the end-to-end tests.
npx playwright test

# Starts the interactive UI mode.
npx playwright test --ui

# Runs the tests only on Desktop Chrome.
npx playwright test --project=chromium

# Runs the tests in a specific file.
npx playwright test example

# Runs the tests in debug mode.
# Starts the interactive UI mode.
npx playwright test --debug

# Auto generate tests with Codegen.
npx playwright codegen
```
