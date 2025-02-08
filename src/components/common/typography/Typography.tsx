import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface TypographyProps {
  children: ReactNode;
  className?: string;
}

export const Heading1 = ({ children, className }: TypographyProps) => (
  <h1 className={cn("text-4xl font-bold tracking-tight", className)}>
    {children}
  </h1>
);

export const Heading2 = ({ children, className }: TypographyProps) => (
  <h2 className={cn("text-3xl font-semibold tracking-tight", className)}>
    {children}
  </h2>
);

export const Heading3 = ({ children, className }: TypographyProps) => (
  <h3 className={cn("text-2xl font-semibold", className)}>{children}</h3>
);

export const Heading4 = ({ children, className }: TypographyProps) => (
  <h4 className={cn("text-md font-medium md:text-xl", className)}>
    {children}
  </h4>
);

export const Paragraph = ({ children, className }: TypographyProps) => (
  <p className={cn("text-sm md:text-md", className)}>{children}</p>
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
  <p className={cn("text-sm italic text-gray-400", className)}>{children}</p>
);
