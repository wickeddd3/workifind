import { faker } from "@faker-js/faker";
import { createClerkUser } from "./_service/clerk-user";
import { createEmployer } from "./_service/employer";
import { createJobs } from "./job-seed";
import { INDUSTRY_TYPES } from "../../src/constants/tags";

export async function createEmployers(count: number) {
  console.log("🚀 Starting Employers Seed...");

  for (let i = 0; i < count; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const emailAddress = faker.internet
      .email({ firstName, lastName })
      .toLowerCase();
    const password = "73sT1NGP@ssw0rD!";
    const companyName = faker.company.name();

    const clerkUser = await createClerkUser({
      emailAddress,
      password,
      firstName,
      lastName,
      publicMetadata: { role: "EMPLOYER" },
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

    const employer = await createEmployer({
      userId: clerkUser.id,
      slug:
        faker.helpers.slugify(companyName).toLowerCase() +
        "-" +
        faker.string.nanoid(4),
      companyName: companyName,
      companyEmail: emailAddress,
      companyWebsite: faker.internet.url(),
      industry: faker.helpers.arrayElement(INDUSTRY_TYPES).value,
      location: faker.location.city(),
      about: faker.lorem.paragraph(),
      perks: [
        { name: "Remote" },
        { name: "Health Insurance" },
        { name: "Government Benefits" },
        { name: "Flexible Hours" },
        { name: "Paid Time Off" },
        { name: "Professional Development" },
      ].map((perk) => JSON.stringify(perk)),
    });

    console.log(`Created Employer ${i + 1}/${count}:`, employer?.companyName);

    if (!employer) {
      // If user creation failed (likely due to existing user), skip profile creation
      console.log(`⏩ Skipping jobs creation for ${companyName}`);
      continue;
    }

    // Create 5 jobs for each employer
    await createJobs(5, clerkUser.id, employer?.id);
  }

  console.log("✅ Seeding employers finished successfully.");
}
