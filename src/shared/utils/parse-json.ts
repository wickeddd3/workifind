import type { Prisma } from "@prisma/client";

export function parseJsonField(fields: Prisma.JsonValue): { name: string }[] {
  if (!Array.isArray(fields)) return [];
  return fields.map((item) => {
    if (typeof item === "string") {
      return JSON.parse(item) as { name: string };
    }
    return item as { name: string };
  });
}
