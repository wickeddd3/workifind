import { Check } from "lucide-react";

/** The perks a company offers, as a checked list. Headingless — see
 *  `EmployerOverview`. */
export function EmployerPerkList({ perks }: { perks?: { name: string }[] }) {
  const listed = perks?.filter((perk) => perk?.name?.trim()) ?? [];

  if (listed.length === 0) return null;

  return (
    <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {listed.map((perk, index) => (
        <li
          key={`${perk.name}-${index}`}
          className="flex items-center gap-2 text-sm text-foreground md:text-md"
        >
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Check size={13} aria-hidden="true" />
          </span>
          {perk.name}
        </li>
      ))}
    </ul>
  );
}
