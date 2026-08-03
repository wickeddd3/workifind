import { Badge } from "@/shared/ui/badge";

import type { ApplicantLanguage } from "../model/types";

/** Body only — see `ApplicantSkills` for why these stay badges. */
export function ApplicantLanguages({
  languages,
}: {
  languages: ApplicantLanguage[];
}) {
  if (!languages?.length) return null;

  return (
    <ul className="flex flex-wrap gap-2">
      {languages.map((language) => (
        <li key={language.id}>
          <Badge variant="secondary" className="gap-1.5">
            {language.name}
            {language.proficiency && (
              <span className="font-normal text-muted-foreground">
                {language.proficiency}
              </span>
            )}
          </Badge>
        </li>
      ))}
    </ul>
  );
}
