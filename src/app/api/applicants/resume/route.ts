import { NextResponse } from "next/server";

import {
  getResumeFileError,
  signResumeUpload,
  uploadApplicantResume,
} from "@/entities/applicant";
import { requireRole } from "@/shared/lib/clerk.server";

// Reads the session and writes to storage on every call.
export const dynamic = "force-dynamic";

/**
 * Store a résumé and hand back a reference to it.
 *
 * A route handler rather than a Server Action, for two reasons that are both
 * hard limits rather than preferences: an action's argument cannot carry a
 * `File` — React's serializer has no branch for one and throws — and an
 * action's request body caps at 1MB. A route handler has neither problem, and
 * an ordinary `XMLHttpRequest` against it reports upload progress, which
 * `fetch` still cannot do.
 *
 * Nothing is written to the applicant's record here. The file is stored and
 * described; attaching it is the save action's job, so a résumé that was
 * uploaded and then abandoned never becomes the one employers see. The cost of
 * that is an orphaned blob, which is the cheaper of the two mistakes.
 */
export async function POST(request: Request) {
  let userId: string;

  try {
    ({ userId } = await requireRole("APPLICANT"));
  } catch (error) {
    return NextResponse.json({ message: "Not allowed" }, { status: 403 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ message: "No file received" }, { status: 400 });
  }

  // The same check the browser ran, repeated because anything can post here.
  const error = getResumeFileError(file);
  if (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }

  const stored = await uploadApplicantResume(file);
  if (!stored) {
    return NextResponse.json(
      { message: "Upload failed. Please try again." },
      { status: 502 },
    );
  }

  // The URL goes back signed, never bare: it is what the save action will act
  // on, so it has to be something the client cannot have invented.
  return NextResponse.json({
    token: signResumeUpload(stored, userId),
    name: stored.name,
  });
}
