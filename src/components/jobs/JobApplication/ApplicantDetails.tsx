import { Applicant } from "@prisma/client";
import { BadgeCheck, Briefcase, Mail, MapPin, Phone } from "lucide-react";

interface ApplicantDetailsProps {
  applicant: Applicant;
}

export default function ApplicantDetails({
  applicant: {
    firstName,
    lastName,
    experienced,
    profession,
    email,
    location,
    phoneNumber,
  },
}: ApplicantDetailsProps) {
  return (
    <div className="flex flex-col space-y-1 rounded-xl bg-gray-50 bg-custom-job-filter-svg bg-cover bg-center bg-no-repeat p-8">
      <div className="flex w-fit items-center justify-between gap-4">
        <h2 className="text-xl font-semibold sm:text-3xl">{`${firstName} ${lastName}`}</h2>
        {experienced && <BadgeCheck size={16} className="shrink-0" />}
      </div>
      {profession && (
        <p className="flex items-center gap-1.5">
          <Briefcase size={18} color="#7b8993" className="shrink-0" />
          <span className="text-md font-medium text-gray-500">
            {profession}
          </span>
        </p>
      )}
      {email && (
        <p className="flex items-center gap-1.5">
          <Mail size={18} color="#7b8993" className="shrink-0" />
          <span className="text-md font-medium text-gray-500">{email}</span>
        </p>
      )}
      {location && (
        <p className="flex items-center gap-1.5">
          <MapPin size={18} color="#7b8993" className="shrink-0" />
          <span className="text-md font-medium text-gray-500">{location}</span>
        </p>
      )}
      {phoneNumber && (
        <p className="flex items-center gap-1.5">
          <Phone size={18} color="#7b8993" className="shrink-0" />
          <span className="text-md font-medium text-gray-500">
            {phoneNumber}
          </span>
        </p>
      )}
    </div>
  );
}
