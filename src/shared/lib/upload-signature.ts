import { createHmac, timingSafeEqual } from "crypto";

import { logger } from "./logger";

/**
 * A reference to an uploaded file that is safe to hand to the browser.
 *
 * Uploading and attaching are two requests: the file goes to a route handler,
 * and the record is only written when the user presses Save. Something has to
 * carry the storage location between them, and the only place to carry it is
 * through the client — which means the server must be able to tell its own
 * reference from one a client made up.
 *
 * Without this, a caller could post any URL to the save action. The download
 * routes fetch whatever is stored, server-side, so an arbitrary URL there is a
 * request forgery — `http://169.254.169.254/…` streamed back through an
 * endpoint of ours. Signing removes the question: an unsigned URL is never
 * stored, so there is nothing to validate against a list of allowed hosts.
 *
 * The signature covers the uploader too, so a token issued to one account
 * cannot be replayed by another, and an expiry, so a leaked one stops working.
 */

const ALGORITHM = "sha256";

/** Long enough to fill in a profile section, short enough to be worth little. */
const TOKEN_TTL_MS = 60 * 60 * 1000;

interface UploadClaims {
  /** Where the file actually is. Never leaves the server unsigned. */
  url: string;
  /** The name it was uploaded under, already sanitized. */
  name: string;
  /** The user the token was issued to. */
  userId: string;
  /** Expiry, epoch milliseconds. */
  expiresAt: number;
}

function secret(): string {
  const value = process.env.UPLOAD_SIGNING_SECRET;

  if (!value) {
    // Fail closed rather than fall back to a constant: a predictable key is the
    // same as no signature at all, and an upload that quietly stops being
    // verified is worse than one that stops working.
    throw new Error(
      "UPLOAD_SIGNING_SECRET is not set. File uploads cannot be signed. " +
        "Generate one with `openssl rand -base64 32`.",
    );
  }

  return value;
}

function toBase64Url(value: Buffer | string) {
  return Buffer.from(value).toString("base64url");
}

function sign(body: string) {
  return createHmac(ALGORITHM, secret()).update(body).digest("base64url");
}

/** Issue a token for a file that has just been stored. */
export function signUpload(
  claims: Omit<UploadClaims, "expiresAt">,
  ttlMs: number = TOKEN_TTL_MS,
): string {
  const body = toBase64Url(
    JSON.stringify({ ...claims, expiresAt: Date.now() + ttlMs }),
  );

  return `${body}.${sign(body)}`;
}

/**
 * Read a token back, or `null` if it was not issued by us, has expired, or
 * belongs to somebody else.
 *
 * One return value for every kind of failure on purpose: the caller's only
 * useful response is to refuse the save, and distinguishing "expired" from
 * "forged" in a message tells an attacker which half they got right.
 */
export function verifyUpload(
  token: string,
  userId: string,
): Omit<UploadClaims, "expiresAt"> | null {
  try {
    const [body, signature] = token.split(".");
    if (!body || !signature) return null;

    const expected = sign(body);

    // Constant-time, and only after a length check — `timingSafeEqual` throws
    // rather than returns false when the buffers differ in size.
    const a = Buffer.from(signature);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

    const claims = JSON.parse(
      Buffer.from(body, "base64url").toString(),
    ) as UploadClaims;

    if (claims.expiresAt < Date.now()) return null;
    if (claims.userId !== userId) return null;

    return { url: claims.url, name: claims.name, userId: claims.userId };
  } catch (error) {
    logger.warn("Rejected an upload token", { reason: "malformed" });
    return null;
  }
}
