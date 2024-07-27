import { Applicant } from "@prisma/client";

interface ProfessionalSearchResultItemProps {
  professional: Applicant;
}

export default function ProfessionalSearchResultItem({
  professional: { firstName, lastName, email, phoneNumber, location },
}: ProfessionalSearchResultItemProps) {
  return (
    <article className="flex cursor-pointer items-center space-x-4 rounded-md border-2 border-gray-100 p-2 hover:bg-gray-50">
      <div className="flex flex-col">
        <h3 className="text-md font-medium text-gray-900">{`${firstName} ${lastName}`}</h3>
        <h4 className="text-sm text-gray-700">{email}</h4>
        <h5 className="text-sm">{phoneNumber}</h5>
        <h5 className="text-sm">{location}</h5>
      </div>
    </article>
  );
}
