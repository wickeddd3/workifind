"use client";

import { FileText } from "lucide-react";

import {
  getResumeFileError,
  RESUME_ACCEPT,
  RESUME_MAX_SIZE_LABEL,
  RESUME_UPLOAD_ENDPOINT,
  type ResumeSummary,
} from "@/entities/applicant/client";
import { Form } from "@/shared/ui/form";
import { CheckboxField } from "@/shared/ui/form-fields/CheckboxField";
import { UploadField } from "@/shared/ui/form-fields/UploadField";
import { ProfileSectionCard } from "@/shared/ui/profile/ProfileSectionCard";

import {
  ApplicantResumeSchema,
  type ApplicantResumeSchemaType,
} from "../../model/schema";
import { useProfileSection } from "../use-profile-section";

/**
 * Attach, replace or remove the résumé on the profile.
 *
 * It takes a `ResumeSummary`, not the applicant record — this is a client
 * component, so anything on its props is serialized into the page, and
 * `resumeUrl` is a permanent unauthenticated link to the owner's personal data.
 * The name and the upload date are all this needs to say what is on file.
 *
 * There is no preview of the document itself, only its name: rendering a PDF
 * viewer here would be a large dependency to tell the owner something they
 * already know about a file they chose.
 */
export function ResumeSection({
  resume,
  uploadedLabel,
}: {
  resume: ResumeSummary | null;
  /**
   * The upload date, already formatted.
   *
   * Formatted by the server parent rather than from `resume.uploadedAt` here:
   * this component renders once on the server and again in the browser, and the
   * two machines do not share a timezone — a file uploaded late in the evening
   * would render as two different days and hydration would disagree.
   */
  uploadedLabel?: string;
}) {
  const { form, onSubmit, isDirty, isSubmitting, justSaved } =
    useProfileSection<ApplicantResumeSchemaType>({
      section: "resume",
      schema: ApplicantResumeSchema,
      defaultValues: { resumeToken: undefined, removeResume: false },
      // Both fields are instructions, not state: the token has been redeemed by
      // the time we get here, and keeping either would re-attach the same
      // upload — or re-remove the résumé — on the next save of this section.
      getResetValues: () => ({ resumeToken: undefined, removeResume: false }),
    });

  const removing = form.watch("removeResume");

  return (
    <ProfileSectionCard
      id="resume"
      title="Résumé"
      description="One PDF or Word document, sent with every application unless you attach a different one."
      isDirty={isDirty}
      isSubmitting={isSubmitting}
      justSaved={justSaved}
      onSubmit={onSubmit}
    >
      <Form {...form}>
        <div className="flex flex-col gap-4">
          {resume ? (
            <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/50 px-3 py-2.5">
              <FileText
                size={20}
                className="shrink-0 text-muted-foreground"
                aria-hidden="true"
              />
              <div className="flex min-w-0 flex-col">
                <span className="truncate text-sm font-medium text-foreground">
                  {resume.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {uploadedLabel ? `On file since ${uploadedLabel}` : "On file"}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Nothing on file yet. Employers reading your profile see a download
              button here once you add one.
            </p>
          )}

          <UploadField
            control={form.control}
            name="resumeToken"
            label={resume ? "Replace with" : "Upload a résumé"}
            endpoint={RESUME_UPLOAD_ENDPOINT}
            accept={RESUME_ACCEPT}
            validate={getResumeFileError}
            // A disabled input rather than a hidden one: it stays visible so
            // the checkbox below reads as the reason it cannot be used.
            disabled={removing}
            description={`PDF, DOC or DOCX, up to ${RESUME_MAX_SIZE_LABEL}. Uploads straight away; Save attaches it to your profile.`}
          />

          {resume && (
            <CheckboxField
              control={form.control}
              name="removeResume"
              label="Remove my résumé — employers will no longer be able to download it"
            />
          )}
        </div>
      </Form>
    </ProfileSectionCard>
  );
}
