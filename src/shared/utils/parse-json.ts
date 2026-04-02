import { Prisma } from "@prisma/client";

export function parseJsonField(fields: Prisma.JsonValue): { name: string }[] {
  if (!Array.isArray(fields)) return [];
  return fields.map((item: Prisma.JsonValue) => {
    if (typeof item === "string") {
      return JSON.parse(item);
    }
    return item;
  });
}
