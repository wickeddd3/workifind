import Markdown from "@/shared/ui/Markdown";

/**
 * Body only — `ProfileSection` supplies the heading and decides what an empty
 * bio looks like, which differs between the owner's page and a visitor's.
 */
export function ApplicantBio({ bio }: { bio: string | null }) {
  if (!bio) return null;

  return (
    <div className="text-sm md:text-md">
      <Markdown>{bio}</Markdown>
    </div>
  );
}
