import { Badge } from "@/shared/ui/badge";
import { Heading4 } from "@/shared/ui/typography/Typography";

export function ApplicantSkills({ skills }: { skills: { name: string }[] }) {
  const hasSkills = skills && skills.length > 0;

  return (
    hasSkills && (
      <div className="flex flex-col space-y-4">
        <Heading4>Skills</Heading4>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <Badge variant="secondary" key={`${skill.name}-${index}`}>
              {skill?.name}
            </Badge>
          ))}
        </div>
      </div>
    )
  );
}
