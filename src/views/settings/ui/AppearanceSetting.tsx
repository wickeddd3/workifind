"use client";

import { type LucideIcon, Monitor, Moon, Sun } from "lucide-react";

import { type Theme, useTheme } from "@/shared/lib/theme";
import { cn } from "@/shared/lib/utils";
import { SectionHeading } from "@/shared/ui/typography/Typography";

const OPTIONS: {
  value: Theme;
  label: string;
  hint: string;
  icon: LucideIcon;
}[] = [
  { value: "light", label: "Light", hint: "Always light", icon: Sun },
  { value: "dark", label: "Dark", hint: "Always dark", icon: Moon },
  // A distinct choice rather than the absence of one: without it, someone who
  // wants to follow their OS has no way back after picking either side.
  {
    value: "system",
    label: "System",
    hint: "Match your device",
    icon: Monitor,
  },
];

/**
 * The theme picker, in the one place a preference is expected to live.
 *
 * It used to sit in the navbar, where it competed with navigation for room and
 * had to shrink to three unlabelled icons to fit. Given a page it can say what
 * each option does.
 */
export function AppearanceSetting() {
  const { theme, setTheme } = useTheme();

  return (
    <section
      id="appearance"
      className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-card md:p-6"
    >
      <div className="flex flex-col gap-1">
        <SectionHeading>Appearance</SectionHeading>
        {/* The choice is kept in this browser's storage, not on the account,
            so say so — otherwise it reads as a setting that failed to follow
            you to your phone. */}
        <p className="text-sm text-muted-foreground">
          How workifind looks. Saved on this device.
        </p>
      </div>

      <div
        role="radiogroup"
        aria-label="Colour theme"
        className="grid grid-cols-1 gap-3 sm:grid-cols-3"
      >
        {OPTIONS.map(({ value, label, hint, icon: Icon }) => {
          const isActive = theme === value;

          return (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={isActive}
              onClick={() => setTheme(value)}
              className={cn(
                "flex items-center gap-3 rounded-xl border p-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                isActive
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/40",
              )}
            >
              <span
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground",
                )}
              >
                <Icon size={16} aria-hidden="true" />
              </span>
              <span className="flex flex-col">
                <span
                  className={cn(
                    "text-sm font-semibold",
                    isActive ? "text-primary" : "text-foreground",
                  )}
                >
                  {label}
                </span>
                <span className="text-xs text-muted-foreground">{hint}</span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
