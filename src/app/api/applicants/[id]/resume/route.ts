import {
  getApplicantResume,
  toResumeFileName,
} from "@/entities/applicant/queries";
import { getAuthUser } from "@/shared/lib/clerk.server";
import { streamAttachment } from "@/shared/lib/file-attachment";

// Authorization is per request and the response is personal data — nothing here
// may be cached or prerendered.
export const dynamic = "force-dynamic";

/**
 * Download an applicant's current résumé.
 *
 * The blob itself is stored with public access, so its URL is a permanent
 * bearer token for a document full of personal data. This route exists so that
 * URL never leaves the server: the browser gets a path that is authorized again
 * on every request, and revoking access is a matter of clearing a column.
 *
 * Who may read it mirrors the `resume` column of `profileVisibility`: employers
 * and the owner, and nobody else. The profile page itself is open to everyone
 * now, which is exactly why this check cannot be inferred from being able to
 * load that page — a signed-in candidate reads another candidate's profile and
 * must still be refused the document.
 *
 * 404 rather than 403 throughout: whether a given person has a résumé on file
 * is itself something an unauthorized caller should not be able to learn.
 */
export async function GET(
  _request: Request,
  { params }: { params: { id: string } },
) {
  const { userId, role } = await getAuthUser();

  if (!userId) return new Response("Not found", { status: 404 });

  const applicant = await getApplicantResume(params.id);

  if (!applicant?.resumeUrl) {
    return new Response("Not found", { status: 404 });
  }

  const isOwner = applicant.userId === userId;

  if (!isOwner && role !== "EMPLOYER") {
    return new Response("Not found", { status: 404 });
  }

  // Re-sanitized on the way out rather than trusted from the column: the name
  // goes into a response header, and a row written before this route existed —
  // or by anything that skips the upload service — has not been through it.
  return streamAttachment(
    applicant.resumeUrl,
    toResumeFileName(applicant.resumeName ?? "resume"),
  );
}
