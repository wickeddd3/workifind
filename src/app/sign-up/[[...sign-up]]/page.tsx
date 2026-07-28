import { SignUp } from "@clerk/nextjs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up",
  robots: { index: false, follow: false },
};

export default function SignUpPage() {
  // See the sign-in page: `h-full` cannot resolve against `main`, so the
  // wrapper carries its own height to centre within.
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-12">
      <SignUp signInUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL} />
    </div>
  );
}
