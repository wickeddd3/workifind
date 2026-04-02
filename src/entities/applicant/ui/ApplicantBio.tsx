import Markdown from "@/components/Markdown";
import { Heading4 } from "lucide-react";

export function ApplicantBio({ bio }: { bio: string | null }) {
  return (
    bio && (
      <div className="flex flex-col space-y-4">
        <Heading4>About me</Heading4>
        {bio && (
          <div className="text-justify text-sm md:text-md">
            <Markdown>{bio}</Markdown>
          </div>
        )}
      </div>
    )
  );
}
