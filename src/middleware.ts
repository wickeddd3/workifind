// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
// import { authorizationMiddleware } from "@/middlewares/authorizationMiddleware";

// const isProtectedRoute = createRouteMatcher([
//   "/employer(.*)",
//   "/applicant(.*)",
//   "/setup(.*)",
// ]);

// export default clerkMiddleware((auth, req) => {
//   let authUser = null;

//   if (isProtectedRoute(req)) {
//     authUser = auth().protect();
//   }

//   return authorizationMiddleware(req, authUser);
// });

// export const config = {
//   matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
// };

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/employer(.*)",
  "/applicant(.*)",
  "/setup(.*)",
]);

export default clerkMiddleware((auth, req) => {
  // const { pathname } = req.nextUrl;
  const { userId } = auth();
  if (isProtectedRoute(req) && !userId) auth().protect();
  // if (pathname === "/") {
  //   return NextResponse.redirect(new URL(`/jobs`, req.nextUrl));
  // }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
