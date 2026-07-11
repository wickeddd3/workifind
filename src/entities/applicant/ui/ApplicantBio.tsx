import Markdown from "@/shared/ui/Markdown";
import { SectionHeading } from "@/shared/ui/typography/Typography";

export function ApplicantBio({ bio }: { bio: string | null }) {
  return (
    bio && (
      <div className="flex flex-col space-y-4">
        <SectionHeading>About me</SectionHeading>
        {bio && (
          <div className="text-justify text-sm md:text-md">
            <Markdown>{bio}</Markdown>
          </div>
        )}
      </div>
    )
  );
}
