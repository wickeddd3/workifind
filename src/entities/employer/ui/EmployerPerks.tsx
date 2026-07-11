import Markdown from "@/shared/ui/Markdown";
import { SectionHeading } from "@/shared/ui/typography/Typography";

export function EmployerPerks({
  pitch,
  perks,
}: {
  pitch?: string | null;
  perks?: { name: string }[];
}) {
  return (
    <div className="flex flex-col space-y-8">
      {pitch && (
        <div className="flex flex-col space-y-4">
          <SectionHeading>Why join us?</SectionHeading>
          <div className="text-justify text-sm md:text-md">
            <Markdown>{pitch}</Markdown>
          </div>
        </div>
      )}
      {perks && perks.length > 0 && (
        <div className="flex flex-col space-y-4">
          <SectionHeading>Perks</SectionHeading>
          <ul className="list-inside text-sm md:text-md">
            {perks.map((item, index) => (
              <li key={`${item?.name}-${index}`}>{item?.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
