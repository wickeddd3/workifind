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
    <Button
      variant="outline"
      className="flex w-fit gap-4 px-3 py-0 md:px-6 md:py-3"
      asChild
    >
      <Link href={route} className="flex items-center justify-center">
        <span className="text-xs font-medium tracking-wider md:text-sm lg:text-md">
          {text}
        </span>
        <ArrowRight size={16} />
      </Link>
    </Button>
  );
}
