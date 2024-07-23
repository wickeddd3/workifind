import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SignedInAuthObject } from "@clerk/backend/internal";

const employerPaths = ["/employer"];
const applicantPaths = ["/applicant"];
const noRolePaths = ["/setup"];

export async function authorizationMiddleware(
  request: NextRequest,
  user: SignedInAuthObject | null,
) {
  const userId = user?.userId;
  const pathname = request.nextUrl.pathname;
  const loggedInAsEmployer = employerPaths.some((path) =>
    pathname.startsWith(path),
  );
  const loggedInAsApplicant = applicantPaths.some((path) =>
    pathname.startsWith(path),
  );
  const loggedInWithNoRole = noRolePaths.some((path) =>
    pathname.startsWith(path),
  );

  if (!loggedInAsEmployer && !loggedInAsApplicant && !loggedInWithNoRole) {
    NextResponse.next();
  } else {
    if (!userId) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    try {
      const response = await fetch(`${request.nextUrl.origin}/api/getUser`, {
        method: "POST",
        body: JSON.stringify({userId}),
      });
      const {user} = await response.json();

      if (loggedInWithNoRole && !user) {
        return NextResponse.redirect(new URL("/setup", request.url));
      }

      const role = user?.role;

      if (loggedInAsEmployer && role === "EMPLOYER") {
        return NextResponse.next();
      } else if (loggedInAsApplicant && role === "APPLICANT") {
        return NextResponse.next();
      } else {
        console.error("Error identifying user role");
        return NextResponse.error();
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      return NextResponse.error();
    }
  }
}
