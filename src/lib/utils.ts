import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatDistanceToNowStrict } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMoney(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function relativeDate(from: Date) {
  return formatDistanceToNowStrict(from, { addSuffix: true });
}

export function longLocalizedDate(date: Date) {
  return format(date, "PP");
}

export function toSlug(str: string) {
  return str
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}

export function parseField(field: FormDataEntryValue) {
  if (typeof field === "string" && field) {
    try {
      return JSON.parse(field).filter(
        (item: { name: string }) => item.name && item.name.trim() !== "",
      );
    } catch (e) {
      console.error(`Failed to parse field: ${field}`, e);
      return [];
    }
  }
  return [];
}
