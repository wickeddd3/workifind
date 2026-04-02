import { notFound } from "next/navigation";
import {
  ApplicantBio,
  ApplicantHeader,
  ApplicantLanguages,
  ApplicantPreferences,
  ApplicantSkills,
  getApplicantProfileById,
} from "@/entities/applicant";

export async function ProfessionalPage({ id }: { id: string }) {
  const applicantId = parseInt(id);
  const applicant = await getApplicantProfileById(applicantId);

  if (!applicant) notFound();

  return (
    <section className="mx-auto flex h-full max-w-4xl flex-col space-y-6 p-4 pb-8">
      <ApplicantHeader applicant={applicant} />
      <div className="flex flex-col gap-4 px-4 md:px-8">
        <ApplicantBio bio={applicant.about} />
        <ApplicantSkills skills={applicant.skills} />
        <ApplicantLanguages languages={applicant.languages} />
        <ApplicantPreferences
          preferredEmploymentTypes={applicant.preferredEmploymentTypes}
          preferredLocationTypes={applicant.preferredLocationTypes}
          preferredLocations={applicant.preferredLocations}
          availability={applicant.availability}
          salaryExpectation={applicant.salaryExpectation}
        />
      </div>
    </section>
  );
}
