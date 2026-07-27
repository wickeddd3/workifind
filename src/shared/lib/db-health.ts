import prisma from "./prisma";

/**
 * Cheap round-trip confirming the database connection is usable.
 *
 * Lives in `shared` rather than an entity: it checks the client itself and
 * reads no domain data, so it belongs to no slice. Kept out of `prisma.ts` so
 * the app layer can import it without importing the client.
 */
export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    return false;
  }
}
