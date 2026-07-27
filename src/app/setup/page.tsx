import type { Metadata } from "next";

import { ProfileSetupPage } from "@/views/profile-setup";

export const metadata: Metadata = {
  title: "Set up your profile",
  robots: { index: false, follow: false },
};

export default async function Page() {
  return <ProfileSetupPage />;
}
