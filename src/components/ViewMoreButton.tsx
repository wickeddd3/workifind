import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface ViewMoreButtonProps {
  text: string;
  route: string;
}

export default function ViewMoreButton({
  text = "",
  route = "",
}: ViewMoreButtonProps) {
  return (
    <Button variant="outline" className="flex w-fit gap-4 px-8 py-6" asChild>
      <Link href={route}>
        <span className="text-lg font-semibold tracking-wider">{text}</span>
        <ArrowRight size={20} />
      </Link>
    </Button>
  );
}
