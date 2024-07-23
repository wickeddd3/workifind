import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { authorizationMiddleware } from "@/middlewares/authorizationMiddleware";

const isProtectedRoute = createRouteMatcher([
  "/employer(.*)",
  "/applicant(.*)",
  "/setup(.*)",
]);

export default clerkMiddleware((auth, req) => {
  let user = null;

  if (isProtectedRoute(req)) {
    user = auth().protect();
  }

  return authorizationMiddleware(req, user);
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
