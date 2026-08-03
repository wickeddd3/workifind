"use client";

import { useFieldArray } from "react-hook-form";

import {
  type ApplicantProfile,
  EMPTY_PREFERRED_LOCATION_ENTRY,
  PreferencesFields,
  PreferredLocationEntryFields,
  toPreferredLocationEntries,
} from "@/entities/applicant/client";
import { Form } from "@/shared/ui/form";
import { RepeatableFieldset } from "@/shared/ui/form-fields/RepeatableFieldset";
import { Label } from "@/shared/ui/label";
import { ProfileSectionCard } from "@/shared/ui/profile/ProfileSectionCard";

import {
  ApplicantPreferencesSchema,
  type ApplicantPreferencesSchemaType,
} from "../../model/schema";
import { useProfileSection } from "../use-profile-section";

export function PreferencesSection({
  applicant,
}: {
  applicant: ApplicantProfile;
}) {
  const { form, onSubmit, isDirty, isSubmitting, justSaved } =
    useProfileSection<ApplicantPreferencesSchemaType>({
      section: "preferences",
      schema: ApplicantPreferencesSchema,
      defaultValues: {
        availability: applicant.availability ?? "",
        preferredEmploymentTypes: applicant.preferredEmploymentTypes ?? [],
        preferredLocationTypes: applicant.preferredLocationTypes ?? [],
        preferredLocations: toPreferredLocationEntries(
          applicant.preferredLocations,
        ),
        salaryExpectation: applicant.salaryExpectation,
      },
    });

  const { fields, append, remove } = useFieldArray<
    ApplicantPreferencesSchemaType,
    "preferredLocations"
  >({ control: form.control, name: "preferredLocations" });

  return (
    <ProfileSectionCard
      id="preferences"
      title="Job preferences"
      description="What you're looking for. Employers filter on these."
      isDirty={isDirty}
      isSubmitting={isSubmitting}
      justSaved={justSaved}
      onSubmit={onSubmit}
    >
      <Form {...form}>
        <div className="flex flex-col gap-4">
          <PreferencesFields control={form.control} />

          <div className="flex flex-col gap-3">
            {/* A plain Label, not FormLabel: that one calls useFormField and
                needs a surrounding FormField, which a group heading has no
                business being inside. */}
            <Label>Preferred locations</Label>
            <RepeatableFieldset
              variant="row"
              itemLabel="location"
              emptyPrompt="No preferred locations yet."
              fields={fields}
              onAdd={() => append(EMPTY_PREFERRED_LOCATION_ENTRY)}
              onRemove={(index) => remove(index)}
            >
              {(index) => (
                <PreferredLocationEntryFields
                  control={form.control}
                  index={index}
                />
              )}
            </RepeatableFieldset>
          </div>
        </div>
      </Form>
    </ProfileSectionCard>
  );
}
