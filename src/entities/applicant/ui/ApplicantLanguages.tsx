import { Badge } from "@/shared/ui/badge";
import { SectionHeading } from "@/shared/ui/typography/Typography";

export function ApplicantLanguages({
  languages,
}: {
  languages: { name: string }[];
}) {
  const hasLanguages = languages && languages.length > 0;

  return (
    hasLanguages && (
      <div className="flex flex-col space-y-4">
        <SectionHeading>Languages</SectionHeading>
        <div className="flex flex-wrap gap-2">
          {languages.map((item, index) => (
            <Badge variant="secondary" key={`${item?.name}-${index}`}>
              {item?.name}
            </Badge>
          ))}
        </div>
      </div>
    )
  );
}
