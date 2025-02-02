import { z } from "zod";

export const requiredString = z.string().trim().min(1, "Required");
export const requiredBoolean = z.boolean({
  required_error: "Required",
  invalid_type_error: "Must be a boolean",
});
export const requiredNumeric = z.number().positive().lte(999999999);
