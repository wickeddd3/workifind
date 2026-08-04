import { BadgeCheck, Mail, MapPin, Phone, UserRoundPen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { RedactedField } from "@/shared/ui/RedactedField";

import type { Applicant } from "../model/types";

const EDIT_HREF = "/applicant/profile/edit";

/**
 * Widened from `Applicant` so a redacted profile fits too: the public page
 * hands this a record whose contact fields were dropped on the server for the
 * visitor's tier, and `contactWithheld` is what tells the difference between
 * "not shared with you" and "never filled in".
 */
type HeaderApplicant = Pick<
  Applicant,
  "firstName" | "lastName" | "profession" | "experienced"
> & {
  email?: string | null;
  phoneNumber?: string | null;
  location?: string | null;
  /** Absent when never set, or when this viewer may not see it. */
  avatarUrl?: string | null;
};

export function ApplicantHeader({
  applicant: {
    firstName,
    lastName,
    email,
    phoneNumber,
    location,
    profession,
    experienced,
    avatarUrl,
  },
  hasEditButton = false,
  contactWithheld = false,
  as: NameHeading = "h2",
  orientation = "row",
}: {
  applicant: HeaderApplicant;
  hasEditButton?: boolean;
  /** Contact details exist but this visitor may not read them. */
  contactWithheld?: boolean;
  as?: "h1" | "h2";
  /**
   * `stacked` centres the avatar over the name and runs the contact details
   * down the card, for the owner's profile rail. A rail is too narrow for the
   * side-by-side arrangement: the name truncates to almost nothing and the
   * contact row wraps to one item per line regardless, so this only makes the
   * result deliberate. The employer's view of a candidate keeps `row`.
   */
  orientation?: "row" | "stacked";
}) {
  const isStacked = orientation === "stacked";
  const hasExperience = experienced === "With experience";
  const initials =
    `${firstName?.charAt(0) ?? ""}${lastName?.charAt(0) ?? ""}`.toUpperCase();
  const hasContact = Boolean(
    email || location || phoneNumber || contactWithheld,
  );

  const identity = (
    <div
      className={cn(
        "flex min-w-0 gap-4",
        isStacked ? "w-full flex-col items-center text-center" : "items-center",
      )}
    >
      {/* The lettermark is the fallback rather than a placeholder image: a
          shared grey glyph on every profile without a picture reads as a
          failure, where initials on the brand gradient read as an absence. */}
      <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-lg font-semibold text-white md:h-16 md:w-16">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt=""
            fill
            sizes="64px"
            className="object-cover"
          />
        ) : (
          initials
        )}
      </div>
      <div
        className={cn(
          "flex min-w-0 flex-col gap-1",
          isStacked && "w-full items-center",
        )}
      >
        <div className="flex max-w-full items-center gap-2">
          <NameHeading className="truncate text-lg font-bold text-foreground md:text-xl">
            {`${firstName} ${lastName}`}
          </NameHeading>
          {hasExperience && !isStacked && (
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
              <BadgeCheck size={14} className="shrink-0" aria-hidden="true" />
              Experienced
            </span>
          )}
        </div>
        {profession && (
          <p className="truncate text-sm font-medium text-muted-foreground md:text-md">
            {profession}
          </p>
        )}
        {/* Below the profession when stacked rather than beside the name: at
            rail width the badge would push the name into an ellipsis. */}
        {hasExperience && isStacked && (
          <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
            <BadgeCheck size={14} className="shrink-0" aria-hidden="true" />
            Experienced
          </span>
        )}
      </div>
    </div>
  );

  const contact = hasContact && (
    <div
      className={cn(
        "text-sm text-muted-foreground",
        isStacked
          ? "flex flex-col gap-2"
          : "flex flex-wrap items-center gap-x-4 gap-y-2",
      )}
    >
      {email && (
        <span className="flex min-w-0 items-center gap-1.5">
          <Mail size={15} className="shrink-0" aria-hidden="true" />
          <span className="truncate">{email}</span>
        </span>
      )}
      {location && (
        <span className="flex min-w-0 items-center gap-1.5">
          <MapPin size={15} className="shrink-0" aria-hidden="true" />
          <span className="truncate">{location}</span>
        </span>
      )}
      {phoneNumber && (
        <span className="flex min-w-0 items-center gap-1.5">
          <Phone size={15} className="shrink-0" aria-hidden="true" />
          <span className="truncate">{phoneNumber}</span>
        </span>
      )}
      {/* Shown in place of the pair, not alongside it: a visitor who may read
          neither should see one statement about that, not two. */}
      {contactWithheld && (
        <RedactedField
          label="Contact details are visible to employers"
          width="9rem"
        />
      )}
    </div>
  );

  return (
    // No surface of its own: both profile pages place this inside a
    // `ProfileSection`-style card, and a tinted panel within a card read as a
    // box inside a box.
    <div className="flex flex-col gap-4">
      {isStacked ? (
        identity
      ) : (
        <div className="flex items-start justify-between gap-4">
          {identity}
          {hasEditButton && (
            <Button size="icon" className="h-8 w-8 shrink-0" asChild>
              <Link href={EDIT_HREF} aria-label="Edit your profile">
                <UserRoundPen size={16} aria-hidden="true" />
              </Link>
            </Button>
          )}
        </div>
      )}

      {contact}

      {/* Full width and labelled when stacked: the rail has the room, and an
          unlabelled icon in a corner is the first thing people miss when
          looking for how to edit their own profile. */}
      {isStacked && hasEditButton && (
        <Button className="w-full" asChild>
          <Link href={EDIT_HREF} className="gap-1.5">
            <UserRoundPen size={16} aria-hidden="true" />
            Edit profile
          </Link>
        </Button>
      )}
    </div>
  );
}
