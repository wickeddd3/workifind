"use client";

import type { Applicant } from "@/entities/applicant";
import { WORK_EXPERIENCE_TYPES } from "@/shared/constants/tags";
import { Form } from "@/shared/ui/form";
import { RadioGroupField } from "@/shared/ui/form-fields/RadioGroupField";
import { TextInputField } from "@/shared/ui/form-fields/TextInputField";

import {
  ApplicantIdentitySchema,
  type ApplicantIdentitySchemaType,
} from "../../model/schema";
import { ProfileSectionCard } from "../ProfileSectionCard";
import { useProfileSection } from "../use-profile-section";

export function IdentitySection({ applicant }: { applicant: Applicant }) {
  const { form, onSubmit, isDirty, isSubmitting, justSaved } =
    useProfileSection<ApplicantIdentitySchemaType>({
      section: "identity",
      schema: ApplicantIdentitySchema,
      defaultValues: {
        firstName: applicant.firstName,
        lastName: applicant.lastName,
        profession: applicant.profession ?? "",
        experienced: applicant.experienced,
        email: applicant.email,
        phoneNumber: applicant.phoneNumber ?? "",
        location: applicant.location ?? "",
      },
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
              name="phoneNumber"
              label="Phone number"
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
