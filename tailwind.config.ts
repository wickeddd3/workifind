import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./src/contexts/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    // Each step pairs a size with a line height and, for display sizes, the
    // negative tracking they need to hold together. Bare sizes were letting
    // headings inherit a body line height, which is what made large type on
    // the hero and job detail read loose.
    fontSize: {
      "4xs": [".375rem", { lineHeight: "0.5rem" }],
      "3xs": [".5rem", { lineHeight: "0.75rem" }],
      "2xs": [".625rem", { lineHeight: "0.875rem" }],
      xs: [".75rem", { lineHeight: "1rem" }],
      sm: [".875rem", { lineHeight: "1.25rem" }],
      md: ["1rem", { lineHeight: "1.5rem" }],
      lg: ["1.125rem", { lineHeight: "1.625rem" }],
      xl: ["1.25rem", { lineHeight: "1.75rem" }],
      "2xl": ["1.5rem", { lineHeight: "2rem", letterSpacing: "-0.01em" }],
      "3xl": ["1.875rem", { lineHeight: "2.25rem", letterSpacing: "-0.017em" }],
      "4xl": ["2.25rem", { lineHeight: "2.5rem", letterSpacing: "-0.02em" }],
      "5xl": ["3rem", { lineHeight: "1.08", letterSpacing: "-0.024em" }],
      "6xl": ["4rem", { lineHeight: "1.05", letterSpacing: "-0.028em" }],
      "7xl": ["5rem", { lineHeight: "1.02", letterSpacing: "-0.032em" }],
      "8xl": ["6rem", { lineHeight: "1", letterSpacing: "-0.036em" }],
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Raw ramps. Reach for these only when a semantic token genuinely does
        // not express the intent — otherwise use the semantic names below so
        // the value stays theme-aware.
        ink: {
          50: "#f6f8f9",
          100: "#eceff1",
          200: "#dde3e7",
          300: "#c3ccd2",
          400: "#90a0a9",
          500: "#6b7c85",
          600: "#526169",
          700: "#3f4c53",
          800: "#2f3a40",
          900: "#263238",
          950: "#161d21",
        },
        brand: {
          50: "#eef0fe",
          100: "#e0e3fd",
          200: "#c6ccfb",
          300: "#a3aaf8",
          400: "#8189f3",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
          950: "#1e1b4b",
        },

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        feature: {
          DEFAULT: "hsl(var(--feature))",
          foreground: "hsl(var(--feature-foreground))",
          subtle: "hsl(var(--feature-subtle))",
          "subtle-foreground": "hsl(var(--feature-subtle-foreground))",
        },
        warn: {
          DEFAULT: "hsl(var(--warn))",
          foreground: "hsl(var(--warn-foreground))",
          subtle: "hsl(var(--warn-subtle))",
          "subtle-foreground": "hsl(var(--warn-subtle-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundImage: {
        "custom-job-filter-svg": "url('/scattered-forcefields.svg')",
        "colored-shapes": "url('/colored-shapes.svg')",
        "not-found": "url('/not-found.svg')",
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        // Display typeface for headings — pairs with the Inter body font.
        heading: [
          "var(--font-heading)",
          "var(--font-inter)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
      boxShadow: {
        // Elevation is tinted with the ink hue (38 50 56) rather than a neutral
        // black, so shadows sit in the same colour family as the borders and
        // the illustrations instead of greying the canvas.
        soft: "0 1px 2px 0 rgb(38 50 56 / 0.04), 0 1px 3px 0 rgb(38 50 56 / 0.06)",
        card: "0 1px 3px 0 rgb(38 50 56 / 0.05), 0 6px 16px -4px rgb(38 50 56 / 0.07)",
        "card-hover":
          "0 4px 12px -2px rgb(38 50 56 / 0.09), 0 12px 28px -6px rgb(38 50 56 / 0.11)",
        // Lift for the actively selected item in a list/detail pairing.
        selected:
          "0 0 0 1px hsl(var(--primary) / 0.35), 0 6px 20px -6px hsl(var(--primary) / 0.28)",
        popover:
          "0 8px 24px -8px rgb(38 50 56 / 0.16), 0 20px 48px -16px rgb(38 50 56 / 0.18)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
