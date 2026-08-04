"use client";

import { ArrowRightIcon, CheckIcon } from "lucide-react";
import Image from "next/image";

import { Button } from "@/shared/ui/button";

export type SetupRole = "APPLICANT" | "EMPLOYER";

/**
 * The artwork is served from `public` rather than imported as a component.
 * These two drawings are 130 kB of path data between them; as JSX that is
 * 130 kB of JavaScript parsed on a route whose only job is to show them once,
 * and `unoptimized` because there is nothing for the image pipeline to do to
 * an SVG.
 */
const ROLES: {
  value: SetupRole;
  title: string;
  summary: string;
  points: string[];
  cta: string;
  illustration: string;
}[] = [
  {
    value: "APPLICANT",
    title: "I'm looking for work",
    summary: "Build one profile and use it everywhere on workifind.",
    points: [
      "Apply without retyping your CV",
      "Save jobs and follow your applications",
      "Be found by employers hiring your skills",
    ],
    cta: "Set up as an applicant",
    illustration: "/illustration-job-hunt.svg",
  },
  {
    value: "EMPLOYER",
    title: "I'm hiring",
    summary: "Put your company in front of the people you want to reach.",
    points: [
      "Post roles and take applications in one place",
      "Search the professionals directory",
      "Give candidates a company page worth reading",
    ],
    cta: "Set up as an employer",
    illustration: "/illustration-job-offer.svg",
  },
];

/**
 * The first thing setup asks, and the one answer that cannot be edited later:
 * the role is written to the account, and this page stops rendering once it is
 * set.
 *
 * That is why it is two cards rather than the segmented control it replaced.
 * A toggle above a form reads as a filter on what is below it — something to
 * flick between while deciding. Two cards, each stating what the role gets you,
 * reads as the fork it actually is, and gives the choice a screen of its own
 * instead of a corner of the form's.
 */
export function RoleChoice({
  onSelect,
}: {
  onSelect: (role: SetupRole) => void;
}) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {ROLES.map(({ value, title, summary, points, cta, illustration }) => (
        // The button's `after` overlay is what makes the whole card clickable.
        // The alternative — a click handler on the card — would leave keyboard
        // users with nothing to focus, so the real control stays a real button
        // and merely grows its hit area to the card's edges.
        <li
          key={value}
          className="group relative flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-card-hover"
        >
          <div className="flex items-center justify-center rounded-xl bg-muted/60 py-3">
            <Image
              src={illustration}
              alt=""
              width={112}
              height={112}
              unoptimized
              priority
              className="h-28 w-auto dark:opacity-90"
            />
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="text-md font-semibold text-foreground md:text-lg">
              {title}
            </h2>
            <p className="text-sm text-muted-foreground">{summary}</p>
          </div>

          <ul className="flex flex-col gap-2">
            {points.map((point) => (
              <li
                key={point}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <CheckIcon
                  size={16}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-feature"
                />
                {point}
              </li>
            ))}
          </ul>

          <Button
            type="button"
            onClick={() => onSelect(value)}
            className="mt-auto w-full gap-2 after:absolute after:inset-0 after:rounded-2xl"
          >
            {cta}
            <ArrowRightIcon size={16} aria-hidden="true" />
          </Button>
        </li>
      ))}
    </ul>
  );
}
