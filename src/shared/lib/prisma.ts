import { PrismaClient } from "@prisma/client";

import { logger } from "./logger";

const prismaClientSingleton = () => {
  // Extend every operation with centralized error logging so a failing DB call
  // is never silently swallowed by a caller's `catch { return null }`. The
  // error is logged with model/operation context, then re-thrown so existing
  // control flow is unchanged.
  return new PrismaClient().$extends({
    query: {
      async $allOperations({ model, operation, args, query }) {
        try {
          return await query(args);
        } catch (error) {
          logger.error(
            `Database query failed: ${model ?? "raw"}.${operation}`,
            error,
          );
          throw error;
        }
      },
    },
  });
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
