import Markdown from "../Markdown";
import { BadgeCheck, Briefcase, Mail, MapPin, Phone } from "lucide-react";
import { Applicant } from "@prisma/client";

interface ProfessionalDetailsProps {
  professional: Applicant & { skills: { name: string }[] } & {
    languages: { name: string }[];
  } & { preferredLocations: { name: string }[] };
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
  return (
    <section className="flex flex-col space-y-6 pb-8">
      <div className="flex flex-col gap-2 rounded-xl bg-gray-50 p-4 md:p-8">
        <div className="flex w-fit items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-gray-900 md:text-2xl">{`${firstName} ${lastName}`}</h2>
          {experienced && <BadgeCheck size={16} className="shrink-0" />}
        </div>
        {profession && (
          <p className="flex items-center gap-1.5">
            <Briefcase size={16} className="shrink-0" />
            <span className="text-sm text-gray-900">{profession}</span>
          </p>
        )}
        {email && (
          <p className="flex items-center gap-1.5">
            <Mail size={16} className="shrink-0" />
            <span className="text-sm text-gray-900">{email}</span>
          </p>
        )}
        {location && (
          <p className="flex items-center gap-1.5">
            <MapPin size={16} className="shrink-0" />
            <span className="text-sm text-gray-900">{location}</span>
          </p>
        )}
        {phoneNumber && (
          <p className="flex items-center gap-1.5">
            <Phone size={16} className="shrink-0" />
            <span className="text-sm text-gray-900">{phoneNumber}</span>
          </p>
        )}
      </div>
      <div className="flex flex-col gap-4 px-8">
        {about && (
          <div className="flex flex-col space-y-4">
            <h1 className="text-md font-bold text-gray-800 md:text-lg">
              About me
            </h1>
            <div className="text-justify text-sm md:text-md">
              {about && <Markdown>{about}</Markdown>}
            </div>
          </div>
        )}
        {skills && skills.length > 0 && (
          <div className="flex flex-col space-y-4">
            <h1 className="text-md font-bold text-gray-800 md:text-lg">
              Skills
            </h1>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  className="flex w-fit rounded-full bg-gray-100 px-2"
                  key={`${skill.name}-${index}`}
                >
                  <span className="w-full p-1 text-xs font-semibold text-gray-800 md:p-2 md:text-sm">
                    {skill?.name}
                  </span>
                </span>
              ))}
            </div>
          </div>
        )}
        {languages && languages.length > 0 && (
          <div className="flex flex-col space-y-4">
            <h1 className="text-md font-bold text-gray-800 md:text-lg">
              Languages
            </h1>
            <span className="text-sm text-gray-900">
              {languages?.map((item) => item?.name).join(", ")}
            </span>
          </div>
        )}
        <div className="flex flex-col space-y-4">
          <h1 className="text-md font-bold text-gray-800 md:text-lg">
            About my next role
          </h1>
          <div className="flex flex-col gap-2 rounded-xl border-2 border-gray-100 p-4">
            {availability && (
              <div className="flex flex-col gap-2">
                <h1 className="text-sm font-medium text-gray-900 md:text-md">
                  Availability
                </h1>
                <span className="text-sm text-gray-900">{availability}</span>
              </div>
            )}
            {preferredEmploymentTypes &&
              preferredEmploymentTypes.length > 0 && (
                <div className="flex flex-col gap-2">
                  <hr />
                  <h1 className="text-sm font-medium text-gray-900 md:text-md">
                    Preferred employment types
                  </h1>
                  <span className="text-sm text-gray-900">
                    {preferredEmploymentTypes.join(", ")}
                  </span>
                </div>
              )}
            {preferredLocationTypes && preferredLocationTypes.length > 0 && (
              <div className="flex flex-col gap-2">
                <hr />
                <h1 className="text-sm font-medium text-gray-900 md:text-md">
                  Preferred location types
                </h1>
                <span className="text-sm text-gray-900">
                  {preferredLocationTypes.join(", ")}
                </span>
              </div>
            )}
            {preferredLocations && preferredLocations.length > 0 && (
              <div className="flex flex-col gap-2">
                <hr />
                <h1 className="text-sm font-medium text-gray-900 md:text-md">
                  Preferred location types
                </h1>
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
                <h1 className="text-sm font-medium text-gray-900 md:text-md">
                  Salary expectation
                </h1>
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
