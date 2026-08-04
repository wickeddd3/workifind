import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/employer(.*)",
  "/applicant(.*)",
  "/setup(.*)",
  // Clerk's own account management. `/settings` is deliberately absent — the
  // theme lives there and is a per-browser preference, so it has to stay
  // reachable without an account.
  "/account(.*)",
  // `/professionals(.*)` is deliberately absent. The directory is open to
  // everyone now, and what changes with the visitor is how much of a profile
  // comes back rather than whether one does — see `profileVisibility` in the
  // applicant entity. Requiring a session here would have made that redaction
  // unreachable: a signed-out visitor never got as far as the page.
]);

export default clerkMiddleware(async (auth, req) => {
  // Clerk v6: `auth` is awaitable and `protect` hangs off it directly, rather
  // than the v5 `auth().protect()`.
  if (isProtectedRoute(req)) await auth.protect();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
