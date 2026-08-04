import { applicants, buildApplicantData } from "../data";
import { ensureClerkUser, logger, prisma, SEED_PASSWORD } from "../helpers";

export async function seedApplicants() {
  logger.start(`Seeding ${applicants.length} applicants...`);

  let skipped = 0;
  let adopted = 0;

  for (let i = 0; i < applicants.length; i++) {
    const applicantSeed = applicants[i];

    const clerkUser = await ensureClerkUser({
      emailAddress: applicantSeed.email,
      password: SEED_PASSWORD,
      firstName: applicantSeed.firstName,
      lastName: applicantSeed.lastName,
      publicMetadata: { role: "APPLICANT" },
    });

    if (!clerkUser) {
      logger.skip(`Skipping applicant for ${applicantSeed.email}`);
      skipped++;
      continue;
    }

    if (!clerkUser.created) adopted++;

    try {
      const applicant = await prisma.applicant.create({
        data: buildApplicantData(clerkUser.id, applicantSeed),
      });
      logger.info(
        `Applicant ${i + 1}/${applicants.length}: ${applicant.firstName} ${applicant.lastName} — ${applicant.profession}, ${applicant.location ?? "no location"}`,
      );
    } catch (error) {
      logger.error(`Applicant create failed for ${applicantSeed.email}`, error);
      skipped++;
    }
  }

  logger.success(
    `Applicants seeded: ${applicants.length - skipped}/${applicants.length}` +
      // See the note in the employer seeder: reuse is the point, and also the
      // reason a teardown has to be told whether to touch Clerk.
      (adopted > 0
        ? ` (${adopted} existing Clerk account${adopted === 1 ? "" : "s"} reused).`
        : "."),
  );
}
