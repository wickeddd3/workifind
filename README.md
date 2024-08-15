This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

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

```bash
# sync prisma schema to your db
npx prisma db push

# update your @prisma/client (run this everytime you update your prisma schema)
npx prisma generate

# run prisma studio on http://localhost:5000
npx prisma studio
```
