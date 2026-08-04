import { NextResponse } from "next/server";

import {
  getLogoFileError,
  signLogoUpload,
  uploadEmployerLogo,
} from "@/entities/employer";
import { getAuthUser } from "@/shared/lib/clerk.server";

// Reads the session and writes to storage on every call.
export const dynamic = "force-dynamic";

/**
 * Store a company logo and hand back a reference to it.
 *
 * The logo used to travel as a `File` on a Server Action argument, which caps
 * the whole submission at 1MB and offers no way to report progress on the way
 * up — a 2MB logo simply failed, and a slow one looked like a hung form.
 *
 * Authentication only — deliberately not `requireRole("EMPLOYER")`. This
 * endpoint is used by the setup wizard, and setup runs *before* the role
 * exists: the role is assigned as part of creating the profile. Someone already
 * holding the other role is still turned away, since an applicant has no
 * employer record to attach this to.
 *
 * Nothing is written to the employer's record here. Attaching the logo is the
 * save action's job, so one that was uploaded and then abandoned never becomes
 * the company's.
 */
export async function POST(request: Request) {
  const { userId, role } = await getAuthUser();

  if (!userId) {
    return NextResponse.json({ message: "Not allowed" }, { status: 401 });
  }
  if (role && role !== "EMPLOYER") {
    return NextResponse.json({ message: "Not allowed" }, { status: 403 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ message: "No file received" }, { status: 400 });
  }

  // The same check the browser ran, repeated because anything can post here.
  const error = getLogoFileError(file);
  if (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }

  const url = await uploadEmployerLogo(file);
  if (!url) {
    return NextResponse.json(
      { message: "Upload failed. Please try again." },
      { status: 502 },
    );
  }

  // The URL goes back signed, never bare: it is what the save action will act
  // on, so it has to be something the client cannot have invented.
  return NextResponse.json({ token: signLogoUpload(url, userId) });
}
