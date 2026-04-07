import { unsaveJob } from "../api/actions";
import type { SavedJob as PrismaSavedJob } from "@prisma/client";

export async function unsaveApplicantJob(
  id: number,
): Promise<PrismaSavedJob | null> {
  try {
    const unsavedJob = await unsaveJob(id);

    return unsavedJob;
  } catch (error) {
    return null;
  }
}
