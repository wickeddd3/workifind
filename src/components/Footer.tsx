import Link from "next/link";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  const currentYear = new Date().getFullYear();

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
              <Link
                href="/"
                className="text-xs font-medium text-gray-900 hover:text-indigo-700 md:text-sm"
              >
                About Us
              </Link>
              <Link
                href="/"
                className="text-xs font-medium text-gray-900 hover:text-indigo-700 md:text-sm"
              >
                Contact
              </Link>
              <Link
                href="/"
                className="text-xs font-medium text-gray-900 hover:text-indigo-700 md:text-sm"
              >
                Terms of Service
              </Link>
              <Link
                href="/"
                className="text-xs font-medium text-gray-900 hover:text-indigo-700 md:text-sm"
              >
                Privacy Policy
              </Link>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Link href="" className="rounded-lg p-1 hover:bg-indigo-100">
                <FaSquareFacebook size="1.5em" color="#3a4955" />
              </Link>
              <Link href="" className="rounded-lg p-1 hover:bg-indigo-100">
                <FaLinkedin size="1.5em" color="#3a4955" />
              </Link>

              <Link href="" className="rounded-lg p-1 hover:bg-indigo-100">
                <FaInstagram size="1.5em" color="#3a4955" />
              </Link>

              <Link href="" className="rounded-lg p-1 hover:bg-indigo-100">
                <FaXTwitter size="1.5em" color="#3a4955" />
              </Link>
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
