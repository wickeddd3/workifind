/**
 * Full currency, no cents. Salaries are stored as whole figures, so the
 * default two-decimal currency format only added noise — "$40,000.00" reads
 * like an invoice rather than a pay band.
 */
export function formatMoney(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Abbreviated currency for dense surfaces — "$40K" instead of "$40,000".
 * Used on list cards, where a full range otherwise eats the width the job
 * title needs.
 */
export function formatMoneyCompact(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: amount < 10_000 ? 1 : 0,
  }).format(amount);
}
