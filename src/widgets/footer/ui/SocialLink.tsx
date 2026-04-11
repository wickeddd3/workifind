import Link from "next/link";
import type { IconType } from "react-icons";

export function SocialLink({
  icon: Icon,
  url = "",
}: {
  icon: IconType;
  url: string;
}) {
  return (
    <Link href={url} className="rounded-lg p-1 hover:bg-indigo-100">
      <Icon size="1.5em" color="#3a4955" />
    </Link>
  );
}
