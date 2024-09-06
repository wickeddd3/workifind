import type { Metadata } from "next";
import { Inter, Open_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { UserProvider } from "@/contexts/UserContext";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const open_sans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
  weight: "300",
});

export const metadata: Metadata = {
  title: {
    default: "workifind",
    template: "%s | workifind",
  },
  description: "Find your dream job",
  generator: "Next.js",
  applicationName: "workifind",
  referrer: "origin-when-cross-origin",
  keywords: ["Next.js", "React", "Typescript"],
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
  metadataBase: new URL("https://workifind.vercel.app"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
      "de-DE": "/de-DE",
    },
  },
  openGraph: {
    title: "workifind",
    description: "Find your dream job",
    url: "https://workifind.vercel.app",
    siteName: "workifind",
    images: "/og-image.png",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      signInForceRedirectUrl={
        process.env.NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL
      }
      signUpForceRedirectUrl={
        process.env.NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL
      }
      signInUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL}
      signUpUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL}
    >
      <html lang="en">
        <body
          className={`${inter.variable} ${open_sans.variable} min-w-[350px]`}
        >
          <UserProvider>
            <Navbar />
            {children}
            <Footer />
          </UserProvider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
