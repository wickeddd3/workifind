import { footerLinks } from "../model/footer.config";
import { socialLinks } from "../model/social.config";
import { FooterCopyright } from "./FooterCopyright";
import { FooterLink } from "./FooterLink";
import { FooterLogo } from "./FooterLogo";
import { SocialLink } from "./SocialLink";

export function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50/50">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col items-center gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <FooterLogo />
            <p className="text-sm text-gray-500">
              Connecting talent with opportunity
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 md:items-end">
            <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {footerLinks.map(({ title, url }) => (
                <FooterLink title={title} url={url} key={title} />
              ))}
            </nav>
            <div className="flex flex-wrap items-center justify-center gap-1">
              {socialLinks.map(({ icon, url, label }, index) => (
                <SocialLink icon={icon} url={url} label={label} key={index} />
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-100 pt-6">
          <FooterCopyright />
        </div>
      </div>
    </footer>
  );
}
