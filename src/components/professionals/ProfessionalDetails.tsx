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
      <div className="flex flex-col space-y-2 rounded-xl bg-gray-50 p-8">
        <div className="flex w-fit items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold">{`${firstName} ${lastName}`}</h2>
          {experienced && <BadgeCheck size={16} className="shrink-0" />}
        </div>
        {profession && (
          <p className="flex items-center gap-1.5">
            <Briefcase size={16} className="shrink-0" />
            <span className="text-sm">{profession}</span>
          </p>
        )}
        {email && (
          <p className="flex items-center gap-1.5">
            <Mail size={16} className="shrink-0" />
            <span className="text-sm">{email}</span>
          </p>
        )}
        {location && (
          <p className="flex items-center gap-1.5">
            <MapPin size={16} className="shrink-0" />
            <span className="text-sm">{location}</span>
          </p>
        )}
        {phoneNumber && (
          <p className="flex items-center gap-1.5">
            <Phone size={16} className="shrink-0" />
            <span className="text-sm">{phoneNumber}</span>
          </p>
        )}
      </div>
      <div className="flex flex-col gap-4 px-8">
        {about && (
          <div className="flex flex-col space-y-4">
            <h1 className="text-lg font-medium">About me</h1>
            <div className="text-md text-justify">
              {about && <Markdown>{about}</Markdown>}
            </div>
          </div>
        )}
        {skills && skills.length > 0 && (
          <div className="flex flex-col space-y-4">
            <h1 className="text-lg font-medium">Skills</h1>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  className="flex w-fit rounded-full bg-gray-100 px-2"
                  key={`${skill.name}-${index}`}
                >
                  <span className="w-full p-2 text-sm font-semibold">
                    {skill?.name}
                  </span>
                </span>
              ))}
            </div>
          </div>
        )}
        {languages && languages.length > 0 && (
          <div className="flex flex-col space-y-4">
            <h1 className="text-lg font-medium">Languages</h1>
            <span className="text-sm">
              {languages?.map((item) => item?.name).join(", ")}
            </span>
          </div>
        )}
        <div className="flex flex-col space-y-4">
          <h1 className="text-lg font-medium">About my next role</h1>
          <div className="flex flex-col gap-2 rounded-xl border-2 border-gray-100 p-4">
            {availability && (
              <div className="flex flex-col gap-2">
                <h1 className="text-md font-medium">Availability</h1>
                <span className="text-sm">{availability}</span>
              </div>
            )}
            {preferredEmploymentTypes &&
              preferredEmploymentTypes.length > 0 && (
                <div className="flex flex-col gap-2">
                  <hr />
                  <h1 className="text-md font-medium">
                    Preferred employment types
                  </h1>
                  <span className="text-sm">
                    {preferredEmploymentTypes.join(", ")}
                  </span>
                </div>
              )}
            {preferredLocationTypes && preferredLocationTypes.length > 0 && (
              <div className="flex flex-col gap-2">
                <hr />
                <h1 className="text-md font-medium">
                  Preferred location types
                </h1>
                <span className="text-sm">
                  {preferredLocationTypes.join(", ")}
                </span>
              </div>
            )}
            {preferredLocations && preferredLocations.length > 0 && (
              <div className="flex flex-col gap-2">
                <hr />
                <h1 className="text-md font-medium">
                  Preferred location types
                </h1>
                {preferredLocations.map((location, index) => (
                  <span className="text-sm" key={`${location}-${index}`}>
                    {location?.name}
                  </span>
                ))}
              </div>
            )}
            {availability && (
              <div className="flex flex-col gap-2">
                <hr />
                <h1 className="text-md font-medium">Salary expectation</h1>
                <span className="text-sm">{salaryExpectation}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
