import { SignIn } from "@clerk/nextjs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default function SignInPage() {
  // `min-h-[70vh]` rather than `h-full`: the wrapper needs a height of its own
  // to centre against. A percentage height resolves to auto here, because
  // `main` is sized by flex distribution inside a `min-h-screen` body and so
  // has no definite height for a percentage to refer to.
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-12">
      <SignIn signUpUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL} />
    </div>
  );
}
