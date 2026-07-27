import Link from "next/link";
import type { IconType } from "react-icons";

export function SocialLink({
  icon: Icon,
  url = "",
  label,
}: {
  icon: IconType;
  url: string;
  label: string;
}) {
  return (
    <Link
      href={url}
      aria-label={label}
      className="rounded-lg p-1 hover:bg-primary/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <Icon size="1.5em" className="text-muted-foreground" aria-hidden="true" />
    </Link>
  );
}
