import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ApplyButtonProps {
  href: string;
}

export default function ApplyButton({ href = "" }: ApplyButtonProps) {
  return (
    <Button asChild>
      <Link href={href}>Apply</Link>
    </Button>
  );
}
