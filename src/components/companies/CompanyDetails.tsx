import Image from "next/image";
import Markdown from "../Markdown";
import { Link as LinkIcon, Mail } from "lucide-react";
import { Employer } from "@prisma/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Heading4,
  MediumText,
  Paragraph,
} from "@/components/common/typography/Typography";

interface CompanyDetailsProps {
  company: Employer & { perks: { name: string }[] };
}

export default function CompanyDetails({
  company: {
    companyName,
    companyEmail,
    companyWebsite,
    companyLogoUrl,
    industry,
    location,
    about,
    pitch,
    perks,
  },
}: CompanyDetailsProps) {
  return (
    <section className="flex flex-col space-y-6">
      {companyLogoUrl && (
        <Image
          src={companyLogoUrl}
          alt={companyName}
          width={140}
          height={140}
          className="rounded-xl"
        />
      )}
      <div className="flex flex-col space-y-2">
        <Heading4 className="font-bold">{companyName}</Heading4>
        {companyWebsite && (
          <h6 className="flex items-center gap-3">
            <LinkIcon size={16} className="shrink-0" />
            <a
              href={`https://${companyWebsite}`}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-normal text-gray-900 hover:underline md:text-md"
            >
              {companyWebsite}
            </a>
          </h6>
        )}
        {companyEmail && (
          <h6 className="flex items-center gap-3">
            <Mail size={16} className="shrink-0" />
            <a
              href={`mailto://${companyEmail}`}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-normal text-gray-900 hover:underline md:text-md"
            >
              {companyEmail}
            </a>
          </h6>
        )}
      </div>
      <Tabs defaultValue="about" className="w-full shadow-none">
        <TabsList className="w-full justify-start rounded-none border-b-2 border-gray-200 bg-white p-0 shadow-none">
          <TabsTrigger
            value="about"
            className="mr-8 rounded-none text-sm font-extrabold capitalize tracking-wider text-gray-400 shadow-none data-[state=active]:font-extrabold data-[state=active]:text-indigo-600 data-[state=active]:!shadow-none md:text-md"
          >
            About
          </TabsTrigger>
          <TabsTrigger
            value="culture"
            className="rounded-none text-sm font-extrabold capitalize tracking-wider text-gray-400 shadow-none data-[state=active]:font-extrabold data-[state=active]:text-indigo-600 data-[state=active]:!shadow-none md:text-md"
          >
            Life and culture
          </TabsTrigger>
        </TabsList>
        <TabsContent value="about" className="py-6 md:py-12">
          <div className="flex flex-col space-y-8">
            {(industry || location) && (
              <div className="flex flex-col space-y-4">
                <Heading4>Company Overview</Heading4>
                {industry && (
                  <div className="flex items-start space-x-12">
                    <MediumText className="text-gray-700">Industry</MediumText>
                    <Paragraph>{industry}</Paragraph>
                  </div>
                )}
                {location && (
                  <div className="flex items-start space-x-12">
                    <MediumText className="text-gray-700">Location</MediumText>
                    <Paragraph>{location}</Paragraph>
                  </div>
                )}
              </div>
            )}
            {about && (
              <div className="flex flex-col space-y-4">
                <Heading4>About us</Heading4>
                <div className="text-justify text-sm md:text-md">
                  <Markdown>{about}</Markdown>
                </div>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="culture" className="py-6 md:py-12">
          <div className="flex flex-col space-y-8">
            {pitch && (
              <div className="flex flex-col space-y-4">
                <Heading4>Why join us?</Heading4>
                <div className="text-justify text-sm md:text-md">
                  <Markdown>{pitch}</Markdown>
                </div>
              </div>
            )}
            {perks && perks.length > 0 && (
              <div className="flex flex-col space-y-4">
                <Heading4>Perks</Heading4>
                <ul className="list-inside text-sm md:text-md">
                  {perks.map((item, index) => (
                    <li key={`${item}${index}`}>{item?.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
