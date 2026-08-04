"use client";

import { useState } from "react";

import { ProfileForm as ApplicantProfileForm } from "@/features/create-applicant-profile";
import { ProfileForm as EmployerProfileForm } from "@/features/create-employer-profile";

import { RoleChoice, type SetupRole } from "./RoleChoice";

const HEADINGS: Record<SetupRole, { title: string; lead: string }> = {
  APPLICANT: {
    title: "Your applicant profile",
    lead: "Only your name, profession and email are required. Everything else can wait until later — you can edit all of it from your profile.",
  },
  EMPLOYER: {
    title: "Your company profile",
    lead: "Only the company name and industry are required. Everything else can wait until later — you can edit all of it from your profile.",
  },
};

/**
 * Setup, in two acts: pick a role, then fill in that role's profile.
 *
 * The role used to be a tab, which meant both profile forms were mounted at
 * once and the choice looked reversible. Holding it in state here means one
 * form exists at a time, and the form's own first step can offer the way back
 * to the fork.
 */
export function ProfileSetupFlow() {
  const [role, setRole] = useState<SetupRole | null>(null);

  const heading = role
    ? HEADINGS[role]
    : {
        title: "Set up your profile",
        lead: "How will you use workifind? Pick the one that fits — this sets up your account, so it is worth getting right.",
      };

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <header className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">
          Get started
        </p>
        <h1 className="text-2xl font-bold text-foreground md:text-3xl">
          {heading.title}
        </h1>
        <p className="text-sm text-muted-foreground md:text-md">
          {heading.lead}
        </p>
      </header>

      {role === null && <RoleChoice onSelect={setRole} />}
      {role === "APPLICANT" && (
        <ApplicantProfileForm onExit={() => setRole(null)} />
      )}
      {role === "EMPLOYER" && (
        <EmployerProfileForm onExit={() => setRole(null)} />
      )}
    </div>
  );
}
