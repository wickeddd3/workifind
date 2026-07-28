import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";

import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/shared/config/site";
import { THEME_INIT_SCRIPT, ThemeProvider } from "@/shared/lib/theme";
import { Footer } from "@/widgets/footer";
import { Navbar } from "@/widgets/navbar";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const plus_jakarta_sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} — Find your next role`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  generator: "Next.js",
  applicationName: SITE_NAME,
  referrer: "origin-when-cross-origin",
  keywords: [
    "jobs",
    "job search",
    "careers",
    "hiring",
    "find a job",
    "job board",
    "employment",
    "recruitment",
  ],
  authors: [
    { name: "Philip", url: "https://philip-andrew-portfolio.netlify.app" },
  ],
  creator: "Philip Andrew",
  publisher: "Philip Andrew",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: `${SITE_NAME} — Find your next role`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: "/og-image.png",
        width: 1895,
        height: 937,
        alt: "workifind — connecting talent with opportunity",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Find your next role`,
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
  },
};

const DynamicToaster = dynamic(() =>
  import("@/shared/ui/toaster").then((mod) => mod.Toaster),
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning: the inline script below stamps `class="dark"`
    // and a colorScheme onto this element before React hydrates, so the client
    // tree legitimately differs from the server's on this node alone.
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Must run before first paint, so it cannot be a component. Without
            it the page renders light and then snaps to dark on hydration. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body
        // `min-h-screen`, not `h-screen`: a fixed viewport height made every
        // page whose content is shorter than the viewport stretch its card to
        // fill, and every page whose content is longer overflow the body. The
        // footer still sits at the bottom on short pages via `flex-1` on main.
        className={`${inter.variable} ${plus_jakarta_sans.variable} flex min-h-screen min-w-[350px] flex-col font-sans antialiased`}
      >
        <ThemeProvider>
          <ClerkProvider
            publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
            afterSignOutUrl="/"
          >
            <SpeedInsights />
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              Skip to main content
            </a>
            <Navbar />
            {/* Deliberately a block, not a flex column. Making it flex would
                let pages fill it with `flex-1`, but it also turns every page
                root into a flex item — and the eighteen page roots that centre
                themselves with `mx-auto` + `max-w-*` would then shrink to their
                content width instead of filling to that cap. */}
            <main id="main-content" className="w-full flex-1">
              {children}
            </main>
            <Footer />
            <DynamicToaster />
          </ClerkProvider>
        </ThemeProvider>
        {/* Analytics loads after hydration rather than from <head>, so it no
            longer competes with the page's own scripts for the main thread.
            Both tags share a strategy, so gtag.js still runs before config. */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-P6XBN1CMQ5"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-P6XBN1CMQ5');
            `}
        </Script>
      </body>
    </html>
  );
}
