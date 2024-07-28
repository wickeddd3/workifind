import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SignedInAuthObject } from "@clerk/backend/internal";
import { getUserById } from "@/actions/user";

const employerPaths = ["/employer"];
const applicantPaths = ["/applicant"];
const noRolePaths = ["/setup"];

export async function authorizationMiddleware(
  request: NextRequest,
  authUser: SignedInAuthObject | null,
) {
  const authUserId = authUser?.userId;
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
    if (!authUserId) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    try {
      const user = await getUserById(authUserId);
      if ((loggedInAsEmployer || loggedInAsApplicant) && !user) {
        return NextResponse.redirect(new URL("/setup", request.url));
      } else if (loggedInWithNoRole && !user) {
        return NextResponse.next();
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
