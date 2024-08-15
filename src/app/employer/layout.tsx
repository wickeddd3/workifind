import { ReactNode } from "react";
import { Profile } from "@/components/Profile";
import { BriefcaseBusiness, CircleUserRound } from "lucide-react";

export default function EmployerProfileLayout({
  children,
}: {
  children: ReactNode;
}) {
  const menu = [
    {
      icon: <CircleUserRound size={20} />,
      title: "Profile",
      href: "/employer/profile",
    },
    {
      icon: <BriefcaseBusiness size={20} />,
      title: "Jobs",
      href: "/employer/jobs",
    },
  ];

  return (
    <Profile>
      <Profile.Sidebar>
        <div className="px-8 pt-4">
          <h1 className="text-lg font-bold">Employer Profile</h1>
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
