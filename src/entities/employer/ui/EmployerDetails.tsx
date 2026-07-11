import Markdown from "@/shared/ui/Markdown";
import {
  MediumText,
  Paragraph,
  SectionHeading,
} from "@/shared/ui/typography/Typography";

export function EmployerDetails({
  industry,
  location,
  about,
}: {
  industry?: string | null;
  location?: string | null;
  about?: string | null;
}) {
  return (
    <div className="flex flex-col space-y-8">
      {(industry || location) && (
        <div className="flex flex-col space-y-4">
          <SectionHeading>Company Overview</SectionHeading>
          {industry && (
            <div className="flex items-start space-x-12">
              <MediumText className="text-gray-700">Industry</MediumText>
              <Paragraph>{industry}</Paragraph>
            </div>
          )}
          {location && (
            <div className="flex items-start space-x-12">
              <MediumText className="text-gray-700">Location</MediumText>
              <Paragraph>{location}</Paragraph>
            </div>
          )}
        </div>
      )}
      {about && (
        <div className="flex flex-col space-y-4">
          <SectionHeading>About us</SectionHeading>
          <div className="text-justify text-sm md:text-md">
            <Markdown>{about}</Markdown>
          </div>
        </div>
      )}
    </div>
  );
}
