import { Badge } from "@/shared/ui/badge";

import type { ApplicantSkill } from "../model/types";

/**
 * Body only — see `ProfileSection` for the heading and the empty case.
 *
 * Deliberately still badges rather than the bordered list the CV records use.
 * A skill is one line however much it carries, and fifteen of them read as a
 * scannable set here and as a wall of panels any other way. The level rides
 * inside the badge so the extra detail costs no extra rows.
 */
export function ApplicantSkills({ skills }: { skills: ApplicantSkill[] }) {
  if (!skills?.length) return null;

  return (
    <ul className="flex flex-wrap gap-2">
      {skills.map((skill) => {
        // "5y" rather than "5 years": it sits inside a badge next to the level,
        // and the long form pushes the badge past the width of the name.
        const detail = [skill.level, skill.years ? `${skill.years}y` : null]
          .filter(Boolean)
          .join(" · ");

        return (
          <li key={skill.id}>
            <Badge variant="secondary" className="gap-1.5">
              {skill.name}
              {detail && (
                <span className="font-normal text-muted-foreground">
                  {detail}
                </span>
              )}
            </Badge>
          </li>
        );
      })}
    </ul>
  );
}
