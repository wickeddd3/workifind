import { Badge } from "@/shared/ui/badge";

/** Body only — see `ProfileSection` for the heading and the empty case. */
export function ApplicantLanguages({
  languages,
}: {
  languages: { name: string }[];
}) {
  if (!languages?.length) return null;

  return (
    <ul className="flex flex-wrap gap-2">
      {languages.map((item, index) => (
        <li key={`${item?.name}-${index}`}>
          <Badge variant="secondary">{item?.name}</Badge>
        </li>
      ))}
    </ul>
  );
}
