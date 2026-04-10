import Markdown from "@/shared/ui/Markdown";

export function JobDescription({
  description,
}: {
  description: string | null;
}) {
  return (
    <div className="text-sm text-gray-900 md:text-md">
      {description && <Markdown>{description}</Markdown>}
    </div>
  );
}
