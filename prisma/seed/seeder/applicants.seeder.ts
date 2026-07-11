import { applicants, buildApplicantData } from "../data";
import { createClerkUser, logger, prisma, SEED_PASSWORD } from "../helpers";

export async function seedApplicants() {
  logger.start(`Seeding ${applicants.length} applicants...`);

  for (let i = 0; i < applicants.length; i++) {
    const applicantSeed = applicants[i];

    const clerkUser = await createClerkUser({
      emailAddress: applicantSeed.email,
      password: SEED_PASSWORD,
      firstName: applicantSeed.firstName,
      lastName: applicantSeed.lastName,
      publicMetadata: { role: "APPLICANT" },
    });

    if (!clerkUser) {
      logger.skip(`Skipping applicant for ${applicantSeed.email}`);
      continue;
    }

    try {
      const applicant = await prisma.applicant.create({
        data: buildApplicantData(clerkUser.id, applicantSeed),
      });
      logger.info(
        `Applicant ${i + 1}/${applicants.length}: ${applicant.firstName} ${applicant.lastName} (${applicant.email})`,
      );
    } catch (error) {
      logger.error(`Applicant create failed for ${applicantSeed.email}`, error);
    }
  }

  logger.success("Applicants seeded.");
}
