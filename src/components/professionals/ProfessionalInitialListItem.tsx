import { Applicant } from "@prisma/client";
import { BadgeCheck, Briefcase, Mail, MapPin } from "lucide-react";

interface ProfessionalInitialListItemProps {
  professional: Applicant;
}

export default function ProfessionalInitialListItem({
  professional: {
    firstName,
    lastName,
    profession,
    email,
    location,
    experienced,
  },
}: ProfessionalInitialListItemProps) {
  return (
    <div className="flex min-w-[250px] flex-col space-y-1 rounded-lg bg-gray-50 p-4 shadow-sm hover:bg-gray-100">
      <div className="flex items-center justify-between">
        <h3 className="text-md font-semibold">{`${firstName} ${lastName}`}</h3>
        {experienced && <BadgeCheck size={16} className="shrink-0" />}
      </div>
      <div className="flex flex-col gap-1 text-muted-foreground">
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
      </div>
    </div>
  );
}
