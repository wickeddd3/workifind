import { BadgeCheck, Mail, MapPin, Phone, UserRoundPen } from "lucide-react";
import Link from "next/link";

import { Button } from "@/shared/ui/button";

import type { Applicant } from "../model/types";

export function ApplicantHeader({
  applicant: {
    firstName,
    lastName,
    email,
    phoneNumber,
    location,
    profession,
    experienced,
  },
  hasEditButton = false,
  as: NameHeading = "h2",
}: {
  applicant: Applicant;
  hasEditButton?: boolean;
  as?: "h1" | "h2";
}) {
  const hasExperience = experienced === "With experience";
  const initials =
    `${firstName?.charAt(0) ?? ""}${lastName?.charAt(0) ?? ""}`.toUpperCase();
  const hasContact = Boolean(email || location || phoneNumber);

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-gray-50 p-4 md:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-lg font-semibold text-white md:h-16 md:w-16">
            {initials}
          </div>
          <div className="flex min-w-0 flex-col gap-1">
            <div className="flex items-center gap-2">
              <NameHeading className="truncate text-lg font-bold text-gray-900 md:text-xl">
                {`${firstName} ${lastName}`}
              </NameHeading>
              {hasExperience && (
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-semibold text-indigo-700">
                  <BadgeCheck
                    size={14}
                    className="shrink-0"
                    aria-hidden="true"
                  />
                  Experienced
                </span>
              )}
            </div>
            {profession && (
              <p className="truncate text-sm font-medium text-gray-500 md:text-md">
                {profession}
              </p>
            )}
          </div>
        </div>
        {hasEditButton && (
          <Button size="icon" className="h-8 w-8 shrink-0" asChild>
            <Link href="/applicant/profile/edit" aria-label="Edit your profile">
              <UserRoundPen size={16} aria-hidden="true" />
            </Link>
          </Button>
        )}
      </div>
      {hasContact && (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600">
          {email && (
            <span className="flex min-w-0 items-center gap-1.5">
              <Mail size={15} className="shrink-0" aria-hidden="true" />
              <span className="truncate">{email}</span>
            </span>
          )}
          {location && (
            <span className="flex items-center gap-1.5">
              <MapPin size={15} className="shrink-0" aria-hidden="true" />
              {location}
            </span>
          )}
          {phoneNumber && (
            <span className="flex items-center gap-1.5">
              <Phone size={15} className="shrink-0" aria-hidden="true" />
              {phoneNumber}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
