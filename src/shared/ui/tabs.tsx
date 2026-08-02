"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/shared/lib/utils";

/**
 * Two shapes, because tabs do two different jobs.
 *
 * `underline` navigates between sections of one thing — a company's about,
 * culture and open roles. It sits on a hairline baseline and marks the active
 * section with a rail, so it reads as a row of headings rather than a control,
 * and stays out of the way of the content it introduces.
 *
 * `segmented` picks between alternatives — applicant or employer at setup. The
 * filled track is what says the options are exclusive and that one is already
 * chosen, which a row of underlined words does not.
 *
 * Set it once on `Tabs`; the list, triggers and panels read it from context.
 * The shape used to live in a class string pasted onto every trigger, which is
 * how one surface ended up fighting the base component with `!shadow-none`.
 */
type TabsVariant = "underline" | "segmented";

const TabsVariantContext = React.createContext<TabsVariant>("segmented");

const tabsListVariants = cva("items-center text-muted-foreground", {
  variants: {
    variant: {
      // Scrolls rather than wraps: a wrapped second row breaks the baseline
      // the underline is measured against.
      //
      // The baseline is an inset shadow rather than `border-b` because this is
      // a scroll container: `overflow-x` makes the block axis scrollable too,
      // so anything reaching past the content box — a trigger pulled down by a
      // negative margin to overlap a real border — buys a 1px vertical
      // scrollbar. An inset shadow paints inside the padding box, costs no
      // layout, and does not scroll with the row.
      underline:
        "flex w-full justify-start gap-6 overflow-x-auto rounded-none bg-transparent p-0 shadow-[inset_0_-1px_0_0_hsl(var(--border))] md:gap-8",
      segmented:
        "inline-flex h-10 justify-center gap-1 rounded-lg border border-border bg-muted p-1",
    },
  },
  defaultVariants: { variant: "segmented" },
});

const tabsTriggerVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // The rail is always in the box — transparent until hover, then the
        // active colour — so switching tabs never shifts the row by a pixel.
        // It sits flush with the bottom of the list, painting over the inset
        // baseline rather than stacking on top of it.
        underline:
          "shrink-0 rounded-none border-b-2 border-transparent px-0 pb-3 pt-1 text-sm text-muted-foreground shadow-none hover:border-border hover:text-foreground focus-visible:rounded-sm focus-visible:ring-offset-0 data-[state=active]:border-primary data-[state=active]:text-primary md:text-md",
        segmented:
          "flex-1 rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground focus-visible:ring-offset-2 data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-soft",
      },
    },
    defaultVariants: { variant: "segmented" },
  },
);

const tabsContentVariants = cva(
  "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        underline: "py-6 md:py-8",
        segmented: "mt-4",
      },
    },
    defaultVariants: { variant: "segmented" },
  },
);

const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> & {
    variant?: TabsVariant;
  }
>(({ variant = "segmented", ...props }, ref) => (
  <TabsVariantContext.Provider value={variant}>
    <TabsPrimitive.Root ref={ref} {...props} />
  </TabsVariantContext.Provider>
));
Tabs.displayName = TabsPrimitive.Root.displayName;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> &
    VariantProps<typeof tabsListVariants>
>(({ className, variant, ...props }, ref) => {
  const inherited = React.useContext(TabsVariantContext);

  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        tabsListVariants({ variant: variant ?? inherited }),
        className,
      )}
      {...props}
    />
  );
});
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> &
    VariantProps<typeof tabsTriggerVariants>
>(({ className, variant, ...props }, ref) => {
  const inherited = React.useContext(TabsVariantContext);

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        tabsTriggerVariants({ variant: variant ?? inherited }),
        className,
      )}
      {...props}
    />
  );
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> &
    VariantProps<typeof tabsContentVariants>
>(({ className, variant, ...props }, ref) => {
  const inherited = React.useContext(TabsVariantContext);

  return (
    <TabsPrimitive.Content
      ref={ref}
      className={cn(
        tabsContentVariants({ variant: variant ?? inherited }),
        className,
      )}
      {...props}
    />
  );
});
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsContent, TabsList, TabsTrigger };
