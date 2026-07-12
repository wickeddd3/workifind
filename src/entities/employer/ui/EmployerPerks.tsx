import { Check } from "lucide-react";

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
          <div className="text-sm md:text-md">
            <Markdown>{pitch}</Markdown>
          </div>
        </div>
      )}
      {perks && perks.length > 0 && (
        <div className="flex flex-col space-y-4">
          <SectionHeading>Perks</SectionHeading>
          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {perks.map((item, index) => (
              <li
                key={`${item?.name}-${index}`}
                className="flex items-center gap-2 text-sm text-gray-800 md:text-md"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                  <Check size={13} aria-hidden="true" />
                </span>
                {item?.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
