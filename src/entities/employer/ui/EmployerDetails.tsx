import Markdown from "@/shared/ui/Markdown";
import { SectionHeading } from "@/shared/ui/typography/Typography";

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
          <SectionHeading>Company overview</SectionHeading>
          <div className="flex flex-col gap-3">
            {industry && (
              <div className="flex gap-4">
                <span className="w-28 shrink-0 text-sm font-medium text-gray-500 md:text-md">
                  Industry
                </span>
                <span className="text-sm text-gray-900 md:text-md">
                  {industry}
                </span>
              </div>
            )}
            {location && (
              <div className="flex gap-4">
                <span className="w-28 shrink-0 text-sm font-medium text-gray-500 md:text-md">
                  Location
                </span>
                <span className="text-sm text-gray-900 md:text-md">
                  {location}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
      {about && (
        <div className="flex flex-col space-y-4">
          <SectionHeading>About us</SectionHeading>
          <div className="text-sm md:text-md">
            <Markdown>{about}</Markdown>
          </div>
        </div>
      )}
    </div>
  );
}
