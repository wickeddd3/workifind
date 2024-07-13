import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/workifind-logo.svg";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="shadow-sm">
      <nav className="m-auto flex max-w-5xl items-center justify-between px-3 py-1">
        <Link href="/" className="flex items-center gap-3">
          <Image src={logo} width={70} height={70} alt="Flow Jobs logo" />
          <span className="text-md font-mono font-semibold tracking-wider">workifind</span>
        </Link>
        <Button asChild>
          <Link href="/jobs/new">Post a job</Link>
        </Button>
      </nav>
    </header>
  );
}
