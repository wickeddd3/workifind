/**
 * Month-granularity dates, as CV records state them.
 *
 * A role runs "March 2024 – June 2025", not from one day to another, so the
 * stored value is the first of the month anchored to UTC and every function
 * here reads it back through the UTC getters. `date-fns`' `format` would use
 * the reader's local zone, which turns 2024-03-01T00:00Z into February for
 * anyone west of Greenwich — the month on the page would differ from the month
 * the owner typed.
 *
 * The wire format is the one `<input type="month">` produces, `YYYY-MM`, so a
 * form value needs no conversion on its way through the browser.
 */

/** What `<input type="month">` emits, and what the record schemas validate. */
export const MONTH_INPUT_PATTERN = /^\d{4}-(0[1-9]|1[0-2])$/;

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/** A stored date as a `YYYY-MM` form value; empty string when there is none. */
export function toMonthInputValue(date?: Date | null): string {
  if (!date) return "";

  const year = date.getUTCFullYear();
  const month = `${date.getUTCMonth() + 1}`.padStart(2, "0");

  return `${year}-${month}`;
}

/** A `YYYY-MM` form value as the first of that month in UTC. */
export function fromMonthInputValue(value?: string | null): Date | null {
  if (!value || !MONTH_INPUT_PATTERN.test(value)) return null;

  const [year, month] = value.split("-").map(Number);

  return new Date(Date.UTC(year, month - 1, 1));
}

/** A stored date as "Mar 2024". */
export function formatMonthYear(date?: Date | null): string {
  if (!date) return "";

  return `${MONTH_NAMES[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

/**
 * The span a CV entry covers — "Mar 2024 – Present" for an ongoing one.
 *
 * Returns an empty string when there is no start and nothing ongoing to report,
 * so a caller can drop the line rather than render a stray dash.
 */
export function formatMonthRange({
  startDate,
  endDate,
  current = false,
}: {
  startDate?: Date | null;
  endDate?: Date | null;
  current?: boolean;
}): string {
  const start = formatMonthYear(startDate);
  // `current` wins over any end date: a record can only be one or the other,
  // and a stale end left behind by unticking and re-ticking would otherwise
  // show as "Mar 2024 – Jun 2025" on a role the owner marked as ongoing.
  const end = current ? "Present" : formatMonthYear(endDate);

  if (start && end) return `${start} – ${end}`;

  return start || end;
}
