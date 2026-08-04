"use client";

import type { Applicant } from "@/entities/applicant";
import {
  AVATAR_ACCEPT,
  AVATAR_UPLOAD_ENDPOINT,
  getAvatarFileError,
} from "@/entities/applicant/client";
import { WORK_EXPERIENCE_TYPES } from "@/shared/constants/tags";
import { Form } from "@/shared/ui/form";
import { ImageUploadField } from "@/shared/ui/form-fields/ImageUploadField";
import { RadioGroupField } from "@/shared/ui/form-fields/RadioGroupField";
import { TextInputField } from "@/shared/ui/form-fields/TextInputField";
import { ProfileSectionCard } from "@/shared/ui/profile/ProfileSectionCard";

import {
  ApplicantIdentitySchema,
  type ApplicantIdentitySchemaType,
} from "../../model/schema";
import { useProfileSection } from "../use-profile-section";

export function IdentitySection({ applicant }: { applicant: Applicant }) {
  const { form, onSubmit, isDirty, isSubmitting, justSaved } =
    useProfileSection<ApplicantIdentitySchemaType>({
      section: "identity",
      schema: ApplicantIdentitySchema,
      defaultValues: {
        // Undefined, not the current URL: the field holds a token for a *new*
        // upload, and seeding it would make an untouched section look dirty.
        avatarToken: undefined,
        firstName: applicant.firstName,
        lastName: applicant.lastName,
        profession: applicant.profession ?? "",
        experienced: applicant.experienced,
        email: applicant.email,
        phoneNumber: applicant.phoneNumber ?? "",
        location: applicant.location ?? "",
      },
      // The token has been spent by the time we get here. Left in the form it
      // would be resubmitted with every later save of this section — and once
      // it passed its hour, an unrelated edit to a phone number would fail with
      // "that upload has expired".
      getResetValues: (values) => ({ ...values, avatarToken: undefined }),
    });

  return (
    <ProfileSectionCard
      id="contact"
      title="Identity & contact"
      description="How employers see and reach you."
      isDirty={isDirty}
      isSubmitting={isSubmitting}
      justSaved={justSaved}
      onSubmit={onSubmit}
    >
      <Form {...form}>
        <div className="flex flex-col gap-4">
          <ImageUploadField
            control={form.control}
            name="avatarToken"
            label="Profile picture"
            endpoint={AVATAR_UPLOAD_ENDPOINT}
            accept={AVATAR_ACCEPT}
            validate={getAvatarFileError}
            currentUrl={applicant.avatarUrl}
            fallback={`${applicant.firstName.charAt(0)}${applicant.lastName.charAt(0)}`.toUpperCase()}
            description="JPG, PNG or WebP, up to 2MB."
          />
          <div className="flex flex-col gap-4 sm:flex-row">
            <TextInputField
              control={form.control}
              name="firstName"
              label="First name"
            />
            <TextInputField
              control={form.control}
              name="lastName"
              label="Last name"
            />
          </div>
          <TextInputField
            control={form.control}
            name="profession"
            label="Profession"
            placeholder="e.g. Frontend Developer"
          />
          <div className="flex flex-col gap-4 sm:flex-row">
            <TextInputField
              control={form.control}
              type="email"
              name="email"
              label="Email"
            />
            <TextInputField
              control={form.control}
              type="tel"
              name="phoneNumber"
              label="Phone number"
              placeholder="+63 917 123 4567"
            />
          </div>
          <TextInputField
            control={form.control}
            name="location"
            label="Current location"
            placeholder="e.g. Austin"
          />
          <RadioGroupField
            control={form.control}
            options={WORK_EXPERIENCE_TYPES}
            name="experienced"
            label="Work experience"
          />
        </div>
      </Form>
    </ProfileSectionCard>
  );
}
