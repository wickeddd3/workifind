import { notFound } from "next/navigation";

import {
  ApplicantBio,
  ApplicantHeader,
  ApplicantLanguages,
  ApplicantPreferences,
  ApplicantSkills,
} from "@/entities/applicant";
import { getApplicantById } from "@/entities/applicant";

export async function ProfessionalPage({ id }: { id: string }) {
  const applicantId = parseInt(id);
  const applicant = await getApplicantById(applicantId);

  if (!applicant) notFound();

  return (
    <section className="mx-auto my-6 flex h-full max-w-4xl flex-col space-y-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-card md:p-8">
      <ApplicantHeader applicant={applicant} as="h1" />
      <div className="flex flex-col gap-6">
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
