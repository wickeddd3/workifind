# workifind

#### Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Prisma

```bash
# sync prisma schema to your db
npx prisma db push

# update your @prisma/client (run this everytime you update your prisma schema)
npx prisma generate

# run prisma studio on http://localhost:5000
npx prisma studio
```

Playwright

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
