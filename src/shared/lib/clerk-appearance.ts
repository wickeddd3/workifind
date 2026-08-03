"use client";

import type { UserProfile } from "@clerk/nextjs";
import type { ComponentProps } from "react";
import { useEffect, useState } from "react";

import { useTheme } from "./theme";

type Appearance = NonNullable<ComponentProps<typeof UserProfile>["appearance"]>;
type Variables = NonNullable<Appearance["variables"]>;

/**
 * Read one of the app's design tokens as a colour Clerk can parse.
 *
 * The tokens are stored as bare HSL channels — `204 27% 98%` — because Tailwind
 * composes its own alpha onto them. Clerk parses whole colours and derives
 * hover and active shades from them, so the channels have to be reassembled
 * into a real `hsl()` before handing them over.
 */
function color(styles: CSSStyleDeclaration, token: string) {
  const raw = styles.getPropertyValue(token).trim();
  if (!raw) return undefined;

  const [hue, saturation, lightness] = raw.split(/\s+/);
  return `hsl(${hue}, ${saturation}, ${lightness})`;
}

function readVariables(): Variables {
  const styles = getComputedStyle(document.documentElement);

  return {
    colorPrimary: color(styles, "--primary"),
    colorPrimaryForeground: color(styles, "--primary-foreground"),
    colorBackground: color(styles, "--card"),
    colorForeground: color(styles, "--card-foreground"),
    colorMuted: color(styles, "--muted"),
    colorMutedForeground: color(styles, "--muted-foreground"),
    colorInput: color(styles, "--background"),
    colorInputForeground: color(styles, "--foreground"),
    colorBorder: color(styles, "--border"),
    colorRing: color(styles, "--ring"),
    colorDanger: color(styles, "--destructive"),
    colorSuccess: color(styles, "--success"),
    colorWarning: color(styles, "--warn"),
    borderRadius: styles.getPropertyValue("--radius").trim() || undefined,
  };
}

/**
 * Renders Clerk's own components against this app's tokens, in whichever theme
 * is active.
 *
 * The values are read off the document element rather than duplicated here:
 * `.dark` swaps the whole token set at once, so anything hardcoded would be a
 * second copy of the palette to keep in sync — and would be wrong in one theme
 * the moment the first copy changed.
 *
 * Undefined until the effect runs, which is deliberate. The tokens only exist
 * in the browser, and rendering Clerk's default palette for one frame beats
 * guessing at the server.
 */
export function useClerkAppearance(): Appearance {
  const { isDark } = useTheme();
  const [variables, setVariables] = useState<Variables>();

  useEffect(() => setVariables(readVariables()), [isDark]);

  return {
    variables,
    elements: {
      // Clerk's card is a fixed width built for a modal. On a page of its own
      // it has to fill the column like every other section does.
      rootBox: "w-full",
      cardBox: "w-full max-w-none shadow-card",
    },
  };
}
