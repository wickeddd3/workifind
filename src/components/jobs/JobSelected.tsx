import Image from "next/image";
import companyLogoPlaceholder from "@/assets/workifind-logo.svg";
import Link from "next/link";
import { Banknote, Briefcase, Clock, Globe2, MapPin } from "lucide-react";
import Markdown from "@/components/Markdown";
import { Button } from "../ui/button";

export default function JobSelected() {
  return (
    <section className="sticky top-0 h-fit rounded-xl bg-background p-4 md:w-3/5 hidden md:block">
      <div className="h-full">
        <section className="w-full grow space-y-5">
          <div className="flex flex-col gap-3">
            {companyLogoPlaceholder && (
              <Image
                src={companyLogoPlaceholder}
                alt="Company logo"
                width={140}
                height={140}
                className="rounded-xl"
              />
            )}
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold">
                  Full-Stack Developer at Stripe
                </h1>
                <p className="text-xl font-semibold">
                  {"Stripe" ? (
                    <Link
                      href={new URL("https://www.google.com").origin}
                      className="text-green-500 hover:underline"
                    >
                      Stripe
                    </Link>
                  ) : (
                    <span>Stripe</span>
                  )}
                </p>
              </div>
              <div className="flex flex-col gap-2 text-muted-foreground">
                <p className="flex items-center gap-1.5">
                  <Briefcase size={16} className="shrink-0" />
                  Full-time
                </p>
                <p className="flex items-center gap-1.5">
                  <MapPin size={16} className="shrink-0" />
                  Remote
                </p>
                <p className="flex items-center gap-1.5">
                  <Globe2 size={16} className="shrink-0" />
                  San Francisco, California, United States
                </p>
                <p className="flex items-center gap-1.5">
                  <Banknote size={16} className="shrink-0" />
                  $150,000.00
                </p>
                <p className="flex items-center gap-1.5 text-sm">
                  Posted 1d ago
                </p>
              </div>
              <div className="flex space-x-4">
                <Button>Apply</Button>
                <Button>Save</Button>
              </div>
            </div>
          </div>
          <div>
            <Markdown>
              About Stripe Stripe is a global technology company that builds
              economic infrastructure for the internet. Our suite of products
              and services are designed to power commerce for online businesses
              of all sizes. At Stripe, we're looking for passionate, creative,
              and innovative developers to help build the next generation of
              payment platforms. Job Description As a Full-Stack Developer at
              Stripe, you will be working on cutting-edge technology to build
              and maintain scalable, efficient, and reliable software solutions.
              You'll collaborate with a team of talented engineers, designers,
              and product managers to deliver exceptional user experiences. Key
              Responsibilities Design, develop, test, deploy, maintain, and
              improve software across the stack. Work closely with other
              engineering teams to integrate and develop new features.
              Contribute to the full software development lifecycle, including
              requirements analysis, architecture, design, coding, testing, and
              deployment. Optimize applications for maximum speed and
              scalability. Participate in code reviews and mentor junior
              developers. Qualifications Bachelor's degree in Computer Science,
              Engineering, or a related field, or equivalent practical
              experience. 3+ years of experience in full-stack development.
              Proficiency in one or more general-purpose programming languages
              including but not limited to: Ruby, Java, JavaScript, Python.
              Experience with front-end technologies such as React, Angular, or
              Vue.js. Familiarity with server-side frameworks like Ruby on
              Rails, Django, or Node.js. Knowledge of database technologies such
              as MySQL, PostgreSQL, and MongoDB. Strong understanding of web
              technologies and architectures. Excellent problem-solving skills
              and attention to detail. Benefits Competitive salary and equity
              package. Health, dental, and vision insurance. Generous vacation
              and parental leave policies. 401(k) plan with employer match.
              Flexible work arrangements. Continuous learning and development
              opportunities. Stripe is an equal opportunity employer. We value
              diversity and are committed to creating an inclusive environment
              for all employees.
            </Markdown>
          </div>
        </section>
      </div>
    </section>
  );
}
