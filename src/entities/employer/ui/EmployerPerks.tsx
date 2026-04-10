import Markdown from "@/shared/ui/Markdown";
import { Heading4 } from "@/shared/ui/typography/Typography";

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
          <Heading4>Why join us?</Heading4>
          <div className="text-justify text-sm md:text-md">
            <Markdown>{pitch}</Markdown>
          </div>
        </div>
      )}
      {perks && perks.length > 0 && (
        <div className="flex flex-col space-y-4">
          <Heading4>Perks</Heading4>
          <ul className="list-inside text-sm md:text-md">
            {perks.map((item, index) => (
              <li key={`${item}${index}`}>{item?.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
