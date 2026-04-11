import { footerLinks } from "../model/footer.config";
import { socialLinks } from "../model/social.config";
import { FooterCopyright } from "./FooterCopyright";
import { FooterLink } from "./FooterLink";
import { FooterLogo } from "./FooterLogo";
import { SocialLink } from "./SocialLink";

export function Footer() {
  return (
    <footer className="bg-gray-white">
      <div className="mx-auto max-w-7xl space-y-5 px-3 py-5">
        <div className="flex flex-col flex-wrap items-center justify-center gap-3 md:flex-row md:justify-between">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <FooterLogo />
            <p className="text-sm font-medium text-gray-900">
              Connecting talents with opportunities
            </p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-wrap items-center justify-center gap-5">
              {footerLinks.map(({ title, url }) => (
                <FooterLink title={title} url={url} key={title} />
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {socialLinks.map(({ icon, url }, index) => (
                <SocialLink icon={icon} url={url} key={index} />
              ))}
            </div>
          </div>
        </div>
        <FooterCopyright />
      </div>
    </footer>
  );
}
