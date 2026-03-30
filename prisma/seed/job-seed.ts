import { faker } from "@faker-js/faker";
import { createJob } from "./_service/job";
import {
  JOB_SALARY,
  EMPLOYMENT_TYPES,
  LOCATION_TYPES,
} from "../../src/constants/tags";

export async function createJobs(
  count: number,
  userId: string,
  employerId: number,
) {
  console.log("🚀 Starting Jobs Seed...");

  for (let j = 0; j < count; j++) {
    const title = faker.person.jobTitle();
    const minSal = faker.helpers.arrayElement(JOB_SALARY).value;

    const job = await createJob({
      userId: userId,
      employerId: employerId,
      title: title,
      slug:
        faker.helpers.slugify(title).toLowerCase() +
        "-" +
        faker.string.nanoid(4),
      employmentType: faker.helpers.arrayElement(EMPLOYMENT_TYPES).value,
      locationType: faker.helpers.arrayElement(LOCATION_TYPES).value,
      location: faker.location.city(),
      description: faker.lorem.paragraphs(2),
      minSalary: minSal,
      maxSalary: minSal + 20000,
    });

    console.log(`Created Job ${j + 1}/${count}:`, job?.title);
  }

  console.log("✅ Seeding jobs finished successfully.");
}
