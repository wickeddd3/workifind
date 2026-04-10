import { Heading4 } from "@/shared/ui/typography/Typography";

export function ApplicantLanguages({
  languages,
}: {
  languages: { name: string }[];
}) {
  const hasLanguages = languages && languages.length > 0;

  return (
    hasLanguages && (
      <div className="flex flex-col space-y-4">
        <Heading4>Languages</Heading4>
        <span className="text-sm text-gray-900">
          {languages?.map((item) => item?.name).join(", ")}
        </span>
      </div>
    )
  );
}
