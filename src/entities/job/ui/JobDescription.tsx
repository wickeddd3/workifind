import Markdown from "@/shared/ui/Markdown";

export function JobDescription({
  description,
}: {
  description: string | null;
}) {
  return (
    <div className="text-sm text-foreground md:text-md">
      {description && <Markdown>{description}</Markdown>}
    </div>
  );
}
