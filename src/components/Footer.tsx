import Link from "next/link";
import { ReactNode } from "react";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";

interface HomePageLinkProps {
  title: string;
  url: string;
}

function HomePageLink({ title = "", url = "" }: HomePageLinkProps) {
  return (
    <Link
      href={url}
      className="text-xs font-medium text-gray-900 hover:text-indigo-700 md:text-sm"
    >
      {title}
    </Link>
  );
}

interface SocialPageLinkProps {
  icon: ReactNode;
  url: string;
}

function SocialPageLink({ icon = null, url = "" }: SocialPageLinkProps) {
  return (
    <Link href={url} className="rounded-lg p-1 hover:bg-indigo-100">
      {icon}
    </Link>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const homePages = [
    {
      title: "About Us",
      url: "/",
    },
    {
      title: "Contact",
      url: "/",
    },
    {
      title: "Terms of Service",
      url: "/",
    },
    {
      title: "Privacy Policy",
      url: "/",
    },
  ];

  const socialPages = [
    {
      icon: <FaSquareFacebook size="1.5em" color="#3a4955" />,
      url: "/",
    },
    {
      icon: <FaLinkedin size="1.5em" color="#3a4955" />,
      url: "/",
    },
    {
      icon: <FaInstagram size="1.5em" color="#3a4955" />,
      url: "/",
    },
    {
      icon: <FaXTwitter size="1.5em" color="#3a4955" />,
      url: "/",
    },
  ];

  return (
    <footer className="bg-gray-white">
      <div className="mx-auto max-w-7xl space-y-5 px-3 py-5">
        <div className="flex flex-col flex-wrap items-center justify-center gap-3 md:flex-row md:justify-between">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <div className="flex w-fit items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-700 text-neutral-100">
                <h3 className="text-center align-middle text-lg font-extrabold">
                  W
                </h3>
              </div>
              <h3 className="text-xl font-extrabold tracking-wider text-gray-800">
                workifind
              </h3>
            </div>
            <p className="text-sm font-medium text-gray-900">
              Connecting talents with opportunities
            </p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-wrap items-center justify-center gap-5">
              {homePages.map(({ title, url }) => (
                <HomePageLink title={title} url={url} key={title} />
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {socialPages.map(({ icon, url }, index) => (
                <SocialPageLink icon={icon} url={url} key={index} />
              ))}
            </div>
          </div>
        </div>
        <h6 className="text-center text-xs font-semibold md:text-sm">
          &copy; {`${currentYear} workifind`}
        </h6>
      </div>
    </footer>
  );
}
