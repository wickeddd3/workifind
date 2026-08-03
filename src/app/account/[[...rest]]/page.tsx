import type { Metadata } from "next";

import { AccountPage } from "@/views/account";

export const metadata: Metadata = {
  title: "Manage account",
  robots: { index: false, follow: false },
};

// Catch-all: Clerk's `<UserProfile routing="path">` navigates to `/account/
// security` and friends, and each of those has to resolve to this page.
export default function Page() {
  return <AccountPage />;
}
