import { toResumeFileName } from "@/entities/applicant/queries";
import { getJobApplicationResume } from "@/entities/job-application";
import { getAuthUser } from "@/shared/lib/clerk.server";
import { streamAttachment } from "@/shared/lib/file-attachment";

// Authorization is per request and the response is personal data — nothing here
// may be cached or prerendered.
export const dynamic = "force-dynamic";

/**
 * Download the résumé sent with one application.
 *
 * Narrower than the profile route on purpose. That one is readable by any
 * employer, because any employer can already open the professional's profile.
 * This file was sent to one company in particular, so only that company — and
 * the applicant who sent it — may read it. An employer browsing applications
 * they did not receive gets nothing.
 *
 * 404 rather than 403, so the id cannot be used to probe which applications
 * exist or carry a résumé.
 */
export async function GET(
  _request: Request,
  { params }: { params: { id: string } },
) {
  const { userId } = await getAuthUser();

  if (!userId) return new Response("Not found", { status: 404 });

  const application = await getJobApplicationResume(params.id);

  if (!application?.resumeUrl) {
    return new Response("Not found", { status: 404 });
  }

  const isSender = application.userId === userId;
  const isRecipient = application.job.userId === userId;

  if (!isSender && !isRecipient) {
    return new Response("Not found", { status: 404 });
  }

  // Re-sanitized on the way out — see the note on the profile résumé route.
  return streamAttachment(
    application.resumeUrl,
    toResumeFileName(application.resumeName ?? "resume"),
  );
}
