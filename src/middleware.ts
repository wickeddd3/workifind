import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { authorizationMiddleware } from "@/middlewares/authorizationMiddleware";

const isProtectedRoute = createRouteMatcher([
  "/employer(.*)",
  "/applicant(.*)",
  "/setup(.*)",
]);

export default clerkMiddleware((auth, req) => {
  let authUser = null;

  if (isProtectedRoute(req)) {
    authUser = auth().protect();
  }

  return authorizationMiddleware(req, authUser);
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
