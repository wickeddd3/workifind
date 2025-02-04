import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <SignUp signInUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL} />
    </div>
  );
}
