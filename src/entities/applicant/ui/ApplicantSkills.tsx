import { Badge } from "@/shared/ui/badge";

/** Body only — see `ProfileSection` for the heading and the empty case. */
export function ApplicantSkills({ skills }: { skills: { name: string }[] }) {
  if (!skills?.length) return null;

  return (
    <ul className="flex flex-wrap gap-2">
      {skills.map((skill, index) => (
        <li key={`${skill?.name}-${index}`}>
          <Badge variant="secondary">{skill?.name}</Badge>
        </li>
      ))}
    </ul>
  );
}
