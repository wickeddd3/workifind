import type { UserRole } from "@/shared/lib/clerk.server";

declare global {
  /**
   * Shape of the custom claims mapped into the Clerk session token.
   *
   * Configured per Clerk instance under Configure → Sessions → Customize
   * session token as:
   *
   *   { "metadata": "{{user.public_metadata}}" }
   *
   * `metadata` is absent entirely on an instance where that mapping has not
   * been set up, which is how `getAuthUser` tells "not configured" apart from
   * "this user genuinely has no role".
   */
  interface CustomJwtSessionClaims {
    metadata?: {
      role?: UserRole;
    };
  }
}

export {};
