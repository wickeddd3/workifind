import type { ReactNode } from "react";

/**
 * The body of one wizard step.
 *
 * The heading is the step's own, not the form's: on a wizard the page title
 * says what is being built and the panel title says what this screen is for,
 * and collapsing the two leaves every step looking identical.
 */
export function WizardPanel({
  id,
  title,
  hint,
  children,
}: {
  id: string;
  title: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={`${id}-title`} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h2
          id={`${id}-title`}
          className="text-lg font-semibold text-foreground md:text-xl"
        >
          {title}
        </h2>
        {hint && <p className="text-sm text-muted-foreground">{hint}</p>}
      </div>
      <div className="flex flex-col gap-5">{children}</div>
    </section>
  );
}
