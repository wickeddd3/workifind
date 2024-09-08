import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={cn(
        "rounded border bg-muted px-2 py-0.5 text-sm font-medium text-muted-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}
