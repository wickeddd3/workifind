import imageLogoPlaceholder from "@/assets/workifind-logo.svg";
import Image from "next/image";
import Markdown from "../Markdown";
import { Link as LinkIcon } from "lucide-react";
import Link from "next/link";

export default function ProfessionalDetails() {
  return (
    <section className="flex flex-col space-y-6">
      {imageLogoPlaceholder && (
        <Image
          src={imageLogoPlaceholder}
          alt="Company logo"
          width={140}
          height={140}
          className="rounded-xl"
        />
      )}
      <div className="flex flex-col space-y-2">
        <h2 className="text-xl font-semibold">Accenture</h2>
        <h6 className="flex items-center gap-3">
          <LinkIcon size={16} className="shrink-0" />
          <Link
            href="http://www.google.com"
            target="_blank"
            className="text-sm font-normal hover:underline"
          >
            http://www.google.com
          </Link>
        </h6>
      </div>
      <div className="flex flex-col space-y-4">
        <h1 className="text-2xl font-medium">Company Overview</h1>
        <div className="flex items-center space-x-12">
          <h3 className="text-md font-semibold">Industry</h3>
          <p className="text-md">Information & technology</p>
        </div>
        <div className="flex items-center space-x-12">
          <h3 className="text-md font-semibold">Location</h3>
          <p className="text-md">makati philippines</p>
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        <h1 className="text-xl font-medium">About us</h1>
        <div className="text-md">
          <Markdown>{"testttttttttttttt"}</Markdown>
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        <h1 className="text-xl font-medium">Why join us?</h1>
        <div className="text-md">
          <Markdown>{"testttttttttttttt"}</Markdown>
        </div>
      </div>
    </section>
  );
}
