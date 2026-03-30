import { faker } from "@faker-js/faker";
import { createClerkUser } from "./_service/clerk-user";
import { createApplicant } from "./_service/applicant";
import {
  EMPLOYMENT_TYPES,
  LOCATION_TYPES,
  AVAILABILITY_TYPES,
  JOB_SALARY,
  WORK_EXPERIENCE_TYPES,
} from "../../src/constants/tags";

export async function createApplicants(count: number) {
  console.log("🚀 Starting Applicants Seed...");

  for (let i = 0; i < count; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const emailAddress = faker.internet
      .email({ firstName, lastName })
      .toLowerCase();
    const password = "73sT1NGP@ssw0rD!";

    const clerkUser = await createClerkUser({
      emailAddress,
      password,
      firstName,
      lastName,
      publicMetadata: { role: "APPLICANT" },
    });

    if (!clerkUser) {
      // If user creation failed (likely due to existing user), skip profile creation
      console.log(`⏩ Skipping user creation for ${emailAddress}`);
      continue;
    }

    console.log(
      `Created Clerk user ${i + 1}/${count}:`,
      clerkUser?.emailAddresses[0]?.emailAddress,
    );

    const applicant = await createApplicant({
      userId: clerkUser.id,
      firstName,
      lastName,
      emailAddress,
      profession: faker.person.jobTitle(),
      experienced: faker.helpers.arrayElement(WORK_EXPERIENCE_TYPES).value,
      skills: [
        { name: "JavaScript" },
        { name: "Python" },
        { name: "Java" },
        { name: "C#" },
        { name: "Ruby" },
        { name: "Go" },
        { name: "PHP" },
      ].map((skill) => JSON.stringify(skill)),
      languages: [{ name: "English" }, { name: "Filipino" }].map((language) =>
        JSON.stringify(language),
      ),
      availability: faker.helpers.arrayElement(AVAILABILITY_TYPES).value,
      salaryExpectation: faker.helpers.arrayElement(JOB_SALARY).value,
      preferredLocations: [{ name: faker.location.city() }].map((location) =>
        JSON.stringify(location),
      ),
      preferredEmploymentTypes: [
        faker.helpers.arrayElement(EMPLOYMENT_TYPES).value,
      ],
      preferredLocationTypes: [
        faker.helpers.arrayElement(LOCATION_TYPES).value,
      ],
    });

    console.log(
      `Created Applicant ${i + 1}/${count}:`,
      `${applicant?.firstName} ${applicant?.lastName} (${applicant?.email})`,
    );
  }

  console.log("✅ Seeding applicants finished successfully.");
}
