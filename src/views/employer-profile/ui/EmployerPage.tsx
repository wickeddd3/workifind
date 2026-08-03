import { notFound } from "next/navigation";

import {
  CompanyProfileCompleteness,
  EmployerHeader,
  EmployerOverview,
  EmployerPerkList,
  EmployerRichText,
  getCompanyProfileCompleteness,
  getEmployer,
} from "@/entities/employer";
import { getAuthUser } from "@/shared/lib/clerk.server";
import { ProfileSection } from "@/shared/ui/profile/ProfileSection";
import { ProfileSectionNav } from "@/shared/ui/profile/ProfileSectionNav";

import { COMPANY_SECTIONS } from "../model/sections";

const EDIT = "/employer/profile/edit";

export async function EmployerPage() {
  const { userId } = await getAuthUser();

  if (!userId) notFound();

  const employer = await getEmployer(userId);

  if (!employer) notFound();

  const completeness = getCompanyProfileCompleteness(employer);

  // Stacked sections rather than tabs. Tabs suited a visitor browsing a company
  // they might apply to; they suit an owner badly, because half of what they
  // own is behind a tab they have no reason to open — an empty "Life and
  // culture" was invisible, and so never filled in. The panels mirror the edit
  // page's sections one-for-one — same ids, same titles, same order — so moving
  // between reading and editing never asks the owner to re-find where something
  // lives.
  //
  // Two columns, matching the applicant's profile: the rail carries who the
  // company is and what is left to fill in, the column beside it is the
  // profile. Both roles read their own profile the same way now.
  return (
    <div className="mx-auto my-6 w-full max-w-6xl px-4 md:my-10">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-6">
        <aside className="flex flex-col gap-4 lg:sticky lg:top-24 lg:w-72 lg:shrink-0">
          <section
            id="identity"
            className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-card"
          >
            <EmployerHeader
              companyName={employer.companyName}
              companyEmail={employer.companyEmail}
              companyWebsite={employer.companyWebsite}
              companyLogoUrl={employer.companyLogoUrl}
              hasEditButton={true}
              as="h1"
              orientation="stacked"
            />
          </section>

          {completeness.missing.length > 0 && (
            <CompanyProfileCompleteness completeness={completeness} />
          )}

          <ProfileSectionNav sections={COMPANY_SECTIONS} />
        </aside>

        {/* Capped at the edit page's width rather than left to fill: the two
            render the same sections, so a section that is wider here than
            there reads as the page jumping when you switch between them. */}
        <div className="flex min-w-0 flex-1 flex-col gap-4 lg:max-w-3xl">
          <ProfileSection
            id="overview"
            title="Company overview"
            editHref={`${EDIT}#overview`}
            isEmpty={!employer.industry && !employer.location}
            emptyPrompt="Say what industry you're in and where you're based."
          >
            <EmployerOverview
              industry={employer.industry}
              location={employer.location}
            />
          </ProfileSection>

          <ProfileSection
            id="about"
            title="About us"
            editHref={`${EDIT}#about`}
            isEmpty={!employer.about?.trim()}
            emptyPrompt="Tell candidates what your company does and who works there."
          >
            <EmployerRichText>{employer.about}</EmployerRichText>
          </ProfileSection>

          <ProfileSection
            id="culture"
            title="Why join us?"
            editHref={`${EDIT}#culture`}
            isEmpty={!employer.pitch?.trim()}
            emptyPrompt="Make the case for working here — this is what candidates weigh against other offers."
          >
            <EmployerRichText>{employer.pitch}</EmployerRichText>
          </ProfileSection>

          <ProfileSection
            id="perks"
            title="Perks"
            editHref={`${EDIT}#perks`}
            isEmpty={!employer.perks?.some((perk) => perk?.name?.trim())}
            emptyPrompt="List what you offer beyond salary."
          >
            <EmployerPerkList perks={employer.perks} />
          </ProfileSection>
        </div>
      </div>
    </div>
  );
}
