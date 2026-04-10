import {
  BadgeCheck,
  Briefcase,
  Mail,
  MapPin,
  Phone,
  UserRoundPen,
} from "lucide-react";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import { Heading4, SmallText } from "@/shared/ui/typography/Typography";
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
}: {
  applicant: Applicant;
  hasEditButton?: boolean;
}) {
  const hasExperience = experienced === "With experience";

  return (
    <div className="flex flex-col space-y-2 rounded-xl bg-gray-50 p-4 md:p-8">
      <div className="flex justify-between">
        <div className="flex w-fit items-center justify-between gap-4">
          <Heading4 className="font-bold">{`${firstName} ${lastName}`}</Heading4>
          {hasExperience && <BadgeCheck size={16} className="shrink-0" />}
        </div>
        {hasEditButton && (
          <Button
            size="icon"
            className="h-8 w-8 bg-indigo-600 hover:bg-indigo-700"
            asChild
          >
            <Link href="/applicant/profile/edit" className="text-xs md:text-sm">
              <UserRoundPen size={16} />
            </Link>
          </Button>
        )}
      </div>
      {profession && (
        <p className="flex items-center gap-1.5">
          <Briefcase size={16} className="shrink-0" />
          <SmallText>{profession}</SmallText>
        </p>
      )}
      {email && (
        <p className="flex items-center gap-1.5">
          <Mail size={16} className="shrink-0" />
          <SmallText>{email}</SmallText>
        </p>
      )}
      {location && (
        <p className="flex items-center gap-1.5">
          <MapPin size={16} className="shrink-0" />
          <SmallText>{location}</SmallText>
        </p>
      )}
      {phoneNumber && (
        <p className="flex items-center gap-1.5">
          <Phone size={16} className="shrink-0" />
          <span className="text-sm">{phoneNumber}</span>
        </p>
      )}
    </div>
  );
}
