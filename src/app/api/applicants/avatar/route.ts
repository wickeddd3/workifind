import { NextResponse } from "next/server";

import {
  getAvatarFileError,
  signAvatarUpload,
  uploadApplicantAvatar,
} from "@/entities/applicant";
import { getAuthUser } from "@/shared/lib/clerk.server";

// Reads the session and writes to storage on every call.
export const dynamic = "force-dynamic";

/**
 * Store an avatar and hand back a reference to it.
 *
 * A route handler rather than a Server Action, for two reasons that are both
 * hard limits rather than preferences: an action's argument cannot carry a
 * `File`, and its request body caps at 1MB. A route handler has neither
 * problem, and an ordinary `XMLHttpRequest` against it reports upload progress,
 * which `fetch` still cannot do in any shipping browser.
 *
 * Authentication only — deliberately not `requireRole("APPLICANT")`, which the
 * résumé route can afford. This endpoint is also used by the setup wizard, and
 * setup runs *before* the role exists: the role is assigned as part of creating
 * the profile. A role check here would make the field unusable in the one flow
 * it was added for. Someone already holding the other role is still turned
 * away, since an employer has no applicant record to attach this to.
 *
 * Nothing is written to the applicant's record here. The image is stored and
 * signed; attaching it is the save action's job, so a picture that was uploaded
 * and then abandoned never becomes the one employers see. The cost of that is
 * an orphaned blob, which is the cheaper of the two mistakes.
 */
export async function POST(request: Request) {
  const { userId, role } = await getAuthUser();

  if (!userId) {
    return NextResponse.json({ message: "Not allowed" }, { status: 401 });
  }
  if (role && role !== "APPLICANT") {
    return NextResponse.json({ message: "Not allowed" }, { status: 403 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ message: "No file received" }, { status: 400 });
  }

  // The same check the browser ran, repeated because anything can post here.
  const error = getAvatarFileError(file);
  if (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }

  const url = await uploadApplicantAvatar(file);
  if (!url) {
    return NextResponse.json(
      { message: "Upload failed. Please try again." },
      { status: 502 },
    );
  }

  // The URL goes back signed, never bare: it is what the save action will act
  // on, so it has to be something the client cannot have invented.
  return NextResponse.json({ token: signAvatarUpload(url, userId) });
}
