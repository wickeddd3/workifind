import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/workifind-logo.svg";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="shadow-sm">
      <nav className="m-auto flex max-w-7xl items-center justify-between px-3 py-1">
        <Link href="/" className="flex items-center gap-3">
          <Image src={logo} width={70} height={70} alt="Flow Jobs logo" />
          <span className="text-md font-mono font-semibold tracking-wider">
            workifind
          </span>
        </Link>
        <div className="md:flex gap-6 hidden">
          <Link href="/jobs" className="flex items-center gap-3">
            <span className="text-sm tracking-wide">
              Find jobs
            </span>
          </Link>
          <Link href="/companies" className="flex items-center gap-3">
            <span className="text-sm tracking-wide">
              Companies
            </span>
          </Link>
          <Link href="/professionals" className="flex items-center gap-3">
            <span className="text-sm tracking-wide">
              Professionals
            </span>
          </Link>
          <Link href="/profile" className="flex items-center gap-3">
            <span className="text-sm tracking-wide">
              Profile
            </span>
          </Link>
        </div>
        <Button asChild>
          <Link href="/jobs/new">Post a job</Link>
        </Button>
      </nav>
    </header>
  );
}
