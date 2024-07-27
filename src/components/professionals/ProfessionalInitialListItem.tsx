import { Applicant } from "@prisma/client";

interface ProfessionalInitialListItemProps {
  professional: Applicant;
}

export default function ProfessionalInitialListItem({
  professional: { firstName, lastName, email, phoneNumber, location },
}: ProfessionalInitialListItemProps) {
  return (
    <div className="flex min-w-[250px] flex-col space-y-2 rounded-lg bg-gray-50 p-4 shadow-sm">
      <h3 className="text-md font-semibold">{`${firstName} ${lastName}`}</h3>
      <h4 className="text-sm font-light">{email}</h4>
      <h4 className="text-sm font-light">{phoneNumber}</h4>
      <h4 className="text-sm font-light">{location}</h4>
    </div>
  );
}
