import validator from "validator";
import { z } from "zod";

export const requiredString = z.string().trim().min(1, "Required");
export const requiredBoolean = z.boolean({
  required_error: "Required",
  invalid_type_error: "Must be a boolean",
});

/**
 * Spacing, brackets and dashes inside a phone number are presentation, not
 * data: `+63 917 123 4567` and `+639171234567` are the same number, and
 * `validator` only recognises the second.
 */
const PHONE_SEPARATORS = /[\s()./-]/g;

/**
 * A mobile number, or nothing.
 *
 * The check runs on the number with its separators removed, and what is stored
 * is still what the person typed. Validating the compact form is the whole fix:
 * `validator.isMobilePhone` matches no format a human writes down, so the field
 * rejected `+63 917 123 4567` — including the numbers this project's own seeder
 * generates, which made every seeded applicant's profile editor refuse to save
 * a phone number it had just loaded.
 *
 * The message is spelled out here rather than left to default. The previous
 * version wrapped the check in `.optional().or(z.literal(""))`, and a failing
 * union reports "Invalid input" and hides which half was meant — so a wrong
 * number said nothing about what a right one looks like.
 */
export const optionalPhone = z
  .string()
  .trim()
  .max(30)
  .refine(
    (value) =>
      !value || validator.isMobilePhone(value.replace(PHONE_SEPARATORS, "")),
    "Enter a valid mobile number, e.g. +63 917 123 4567",
  )
  .optional();

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
