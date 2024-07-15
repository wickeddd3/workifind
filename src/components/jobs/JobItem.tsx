import Image from "next/image";
import companyLogoPlaceholder from "@/assets/workifind-logo.svg";
import { Banknote, Briefcase, Clock, Globe2, MapPin } from "lucide-react";
import Badge from "@/components/Badge";

export default function JobItem() {
  return (
    <article className="flex gap-3 rounded-lg border p-3 hover:bg-muted/60 cursor-pointer">
      <div className="flex-grow space-y-3">
        <Image
          src={companyLogoPlaceholder}
          alt={`${"companyName"} logo`}
          width={100}
          height={70}
          className="self-center rounded-lg"
        />
        <div>
          <h2 className="text-xl font-medium">
            Full-Stack Developer at Stripe
          </h2>
          <p className="text-muted-foreground">Stripe</p>
        </div>
        <div className="flex flex-col gap-1 text-muted-foreground">
          <p className="flex items-center gap-1.5 text-sm">
            <MapPin size={16} className="shrink-0" />
            Remote
          </p>
          <p className="flex items-center gap-1.5 text-sm">
            <Globe2 size={16} className="shrink-0" />
            San Francisco, California, United States
          </p>
          <p className="flex items-center gap-1.5 text-sm">
            <Banknote size={16} className="shrink-0" />
            $150,000.00
          </p>
          <p className="flex items-center gap-1.5 text-sm sm:hidden">
            <Clock size={16} className="shrink-0" />
            3h ago
          </p>
        </div>
      </div>
      <div className="hidden shrink-0 flex-col items-end justify-between sm:flex">
        <Badge>Full-time</Badge>
        <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Clock size={16} />
          3h ago
        </span>
      </div>
    </article>
  );
}
