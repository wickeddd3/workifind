import { Bookmark, BriefcaseBusiness, CircleUserRound } from "lucide-react";
import { type ReactNode } from "react";

import { Profile } from "@/widgets/profile";

export default function ApplicantProfileLayout({
  children,
}: {
  children: ReactNode;
}) {
  const menu = [
    {
      icon: <CircleUserRound size={20} />,
      title: "Profile",
      href: "/applicant/profile",
    },
    {
      icon: <BriefcaseBusiness size={20} />,
      title: "Applied jobs",
      href: "/applicant/jobs",
    },
    {
      icon: <Bookmark size={20} />,
      title: "Saved jobs",
      href: "/applicant/jobs/saved",
    },
  ];

  return (
    <Profile>
      <Profile.Sidebar>
        <div className="px-4 pt-4 lg:px-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Applicant
          </p>
          <h2 className="text-lg font-bold text-gray-900">Your dashboard</h2>
        </div>
        <Profile.Navigation>
          <Profile.NavigationList>
            {menu.map((item) => (
              <Profile.NavigationListItem
                key={item.title}
                icon={item.icon}
                title={item.title}
                href={item.href}
              />
            ))}
          </Profile.NavigationList>
        </Profile.Navigation>
      </Profile.Sidebar>
      <Profile.Content>{children}</Profile.Content>
    </Profile>
  );
}
