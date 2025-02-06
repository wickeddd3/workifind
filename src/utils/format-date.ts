import { format, formatDistanceToNowStrict } from "date-fns";

export function relativeDate(from: Date) {
  return formatDistanceToNowStrict(from, { addSuffix: true });
}

export function longLocalizedDate(date: Date) {
  return format(date, "PP");
}
