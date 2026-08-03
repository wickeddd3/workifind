"use client";

import { useFieldArray } from "react-hook-form";

import {
  type ApplicantProfile,
  CertificationEntryFields,
  EMPTY_CERTIFICATION_ENTRY,
  toCertificationEntries,
} from "@/entities/applicant/client";
import { Form } from "@/shared/ui/form";
import { RepeatableFieldset } from "@/shared/ui/form-fields/RepeatableFieldset";
import { ProfileSectionCard } from "@/shared/ui/profile/ProfileSectionCard";

import {
  ApplicantCertificationsSchema,
  type ApplicantCertificationsSchemaType,
} from "../../model/schema";
import { useProfileSection } from "../use-profile-section";

export function CertificationsSection({
  applicant,
}: {
  applicant: ApplicantProfile;
}) {
  const { form, onSubmit, isDirty, isSubmitting, justSaved } =
    useProfileSection<ApplicantCertificationsSchemaType>({
      section: "certifications",
      schema: ApplicantCertificationsSchema,
      defaultValues: {
        certifications: toCertificationEntries(applicant.certifications),
      },
    });

  const { fields, append, remove } = useFieldArray<
    ApplicantCertificationsSchemaType,
    "certifications"
  >({ control: form.control, name: "certifications" });

  return (
    <ProfileSectionCard
      id="certifications"
      title="Certifications"
      description="Licences and certificates you hold, with a link if one can be verified."
      isDirty={isDirty}
      isSubmitting={isSubmitting}
      justSaved={justSaved}
      onSubmit={onSubmit}
    >
      <Form {...form}>
        <RepeatableFieldset
          itemLabel="certificate"
          emptyPrompt="No certificates yet. This section is optional — plenty of professions award none."
          fields={fields}
          onAdd={() => append(EMPTY_CERTIFICATION_ENTRY)}
          onRemove={(index) => remove(index)}
        >
          {(index) => (
            <CertificationEntryFields control={form.control} index={index} />
          )}
        </RepeatableFieldset>
      </Form>
    </ProfileSectionCard>
  );
}
