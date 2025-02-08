import Markdown from "@/components/Markdown";
import { BadgeCheck, Briefcase, Mail, MapPin, Phone } from "lucide-react";
import { Applicant } from "@prisma/client";
import {
  Heading4,
  MediumText,
  SmallText,
} from "@/components/common/typography/Typography";
import { Badge } from "@/components/ui/badge";

interface ProfessionalDetailsProps {
  professional: Applicant & {
    skills: { name: string }[];
    languages: { name: string }[];
    preferredLocations: { name: string }[];
  };
}

export default function ProfessionalDetails({
  professional: {
    firstName,
    lastName,
    email,
    phoneNumber,
    location,
    about,
    profession,
    experienced,
    skills,
    languages,
    availability,
    preferredEmploymentTypes,
    preferredLocationTypes,
    preferredLocations,
    salaryExpectation,
  },
}: ProfessionalDetailsProps) {
  const hasSkills = skills && skills.length > 0;
  const hasLanguages = languages && languages.length > 0;
  const hasPreferredEmploymentTypes =
    preferredEmploymentTypes && preferredEmploymentTypes.length > 0;
  const hasPreferredLocationTypes =
    preferredLocationTypes && preferredLocationTypes.length > 0;
  const hasPreferredLocations =
    preferredLocations && preferredLocations.length > 0;
  const hasExperience = experienced === "With experience";

  return (
    <section className="flex flex-col space-y-6 pb-8">
      <div className="flex flex-col gap-2 rounded-xl bg-gray-50 p-4 md:p-8">
        <div className="flex w-fit items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-gray-900 md:text-2xl">{`${firstName} ${lastName}`}</h2>
          {hasExperience && <BadgeCheck size={16} className="shrink-0" />}
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
      <div className="flex flex-col gap-4 px-4 md:px-8">
        {about && (
          <div className="flex flex-col space-y-4">
            <Heading4>About me</Heading4>
            {about && (
              <div className="text-justify text-sm md:text-md">
                <Markdown>{about}</Markdown>
              </div>
            )}
          </div>
        )}
        {hasSkills && (
          <div className="flex flex-col space-y-4">
            <Heading4>Skills</Heading4>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <Badge variant="secondary" key={`${skill.name}-${index}`}>
                  {skill?.name}
                </Badge>
              ))}
            </div>
          </div>
        )}
        {hasLanguages && (
          <div className="flex flex-col space-y-4">
            <Heading4>Languages</Heading4>
            <span className="text-sm text-gray-900">
              {languages?.map((item) => item?.name).join(", ")}
            </span>
          </div>
        )}
        <div className="flex flex-col space-y-4">
          <Heading4>About my next role</Heading4>
          <div className="flex flex-col gap-2 rounded-xl border-2 border-gray-100 p-4">
            {availability && (
              <div className="flex flex-col gap-2">
                <MediumText>Availability</MediumText>
                <span className="text-sm text-gray-900">{availability}</span>
              </div>
            )}
            {hasPreferredEmploymentTypes && (
              <div className="flex flex-col gap-2">
                <hr />
                <MediumText>Preferred employment types</MediumText>
                <span className="text-sm text-gray-900">
                  {preferredEmploymentTypes.join(", ")}
                </span>
              </div>
            )}
            {hasPreferredLocationTypes && (
              <div className="flex flex-col gap-2">
                <hr />
                <MediumText>Preferred location types</MediumText>
                <span className="text-sm text-gray-900">
                  {preferredLocationTypes.join(", ")}
                </span>
              </div>
            )}
            {hasPreferredLocations && (
              <div className="flex flex-col gap-2">
                <hr />
                <MediumText>Preferred locations</MediumText>
                {preferredLocations.map((location, index) => (
                  <span
                    className="text-sm text-gray-900"
                    key={`${location}-${index}`}
                  >
                    {location?.name}
                  </span>
                ))}
              </div>
            )}
            {availability && (
              <div className="flex flex-col gap-2">
                <hr />
                <MediumText>Salary expectation</MediumText>
                <span className="text-sm text-gray-900">
                  {salaryExpectation}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
