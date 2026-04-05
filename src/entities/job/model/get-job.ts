import { getJobBySlug } from "../api/actions";
import { Job } from "./types";

export async function getJobDetailsBySlug(slug: string): Promise<Job | null> {
  try {
    const job = await getJobBySlug(slug);

    return job;
  } catch (error) {
    return null;
  }
}
