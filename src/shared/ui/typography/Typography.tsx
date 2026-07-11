import { type ReactNode } from "react";

import { cn } from "@/shared/lib/utils";

interface TypographyProps {
  children: ReactNode;
  className?: string;
}

export const Heading1 = ({ children, className }: TypographyProps) => (
  <h1
    className={cn(
      "text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl",
      className,
    )}
  >
    {children}
  </h1>
);

export const Heading2 = ({ children, className }: TypographyProps) => (
  <h2
    className={cn(
      "text-2xl font-semibold leading-tight tracking-tight md:text-3xl",
      className,
    )}
  >
    {children}
  </h2>
);

export const Heading3 = ({ children, className }: TypographyProps) => (
  <h3
    className={cn("text-xl font-semibold leading-snug md:text-2xl", className)}
  >
    {children}
  </h3>
);

// Section-level heading used for content sections that sit under a page's
// primary heading. Renders an <h2> so heading order stays valid (no level
// skips) while keeping the level-4 visual scale. A small indigo accent bar
// gives profile/detail sections consistent visual structure.
export const SectionHeading = ({ children, className }: TypographyProps) => (
  <h2
    className={cn(
      "flex items-center gap-2.5 text-md font-medium md:text-xl",
      className,
    )}
  >
    <span
      aria-hidden="true"
      className="h-5 w-1 shrink-0 rounded-full bg-indigo-500 md:h-6"
    />
    {children}
  </h2>
);

export const Paragraph = ({ children, className }: TypographyProps) => (
  <p className={cn("text-sm leading-relaxed md:text-md", className)}>
    {children}
  </p>
);

export const MediumText = ({ children, className }: TypographyProps) => (
  <span className={cn("text-sm font-medium md:text-md", className)}>
    {children}
  </span>
);

export const NormalText = ({ children, className }: TypographyProps) => (
  <span className={cn("text-base", className)}>{children}</span>
);

export const SmallText = ({ children, className }: TypographyProps) => (
  <span className={cn("text-sm", className)}>{children}</span>
);

export const MutedText = ({ children, className }: TypographyProps) => (
  <p className={cn("text-sm italic text-gray-500", className)}>{children}</p>
);
