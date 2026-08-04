import { z } from "zod";

export const requiredString = z.string().trim().min(1, "Required");
export const requiredBoolean = z.boolean({
  required_error: "Required",
  invalid_type_error: "Must be a boolean",
});

/**
 * A whole number typed into a `type="number"` input, or nothing at all.
 *
 * Two facts decide this shape.
 *
 * An untouched number input submits `""`, not `undefined`, so "nothing" has to
 * be a value the schema accepts rather than an absence it tolerates. And the
 * same schema runs twice — once in the browser, then again in the server action
 * on what the browser's parse produced — so **it has to accept its own output**.
 * That is what the previous version got wrong: it transformed `""` into `0`,
 * and `0` then matched neither its string branch nor its `.positive()` number
 * branch, so every save that left the field blank was rejected server-side as
 * "Invalid input".
 *
 * Nothing is coerced or transformed here for the same reason. The value passes
 * through as whatever the form held, and the callers' mappers do the single
 * `parseInt` on the way to the database, where the column is an `Int`.
 */
export const optionalAmount = z
  .union([z.string(), z.number()])
  .optional()
  .superRefine((value, ctx) => {
    if (value === undefined || value === "") return;

    const amount = Number(value);
    const fail = (message: string) =>
      ctx.addIssue({ code: z.ZodIssueCode.custom, message });

    // A union reports "Invalid input" and hides which half was meant, so the
    // rules are checked here instead, one message each.
    if (!Number.isFinite(amount)) return fail("Enter a number");
    if (amount < 0) return fail("Must be a non-negative number");
    if (!Number.isInteger(amount)) return fail("Must be a whole number");
    if (amount > 999999999) return fail("That figure is too large");
  });
