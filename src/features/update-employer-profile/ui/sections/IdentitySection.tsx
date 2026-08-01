"use client";

import type { Employer } from "@/entities/employer";
import { Avatar } from "@/shared/ui/avatar";
import { Form } from "@/shared/ui/form";
import { FileUploadField } from "@/shared/ui/form-fields/FileUploadField";
import { TextInputField } from "@/shared/ui/form-fields/TextInputField";
import { ProfileSectionCard } from "@/shared/ui/profile/ProfileSectionCard";

import {
  EmployerIdentitySchema,
  type EmployerIdentitySchemaType,
} from "../../model/schema";
import { useEmployerSection } from "../use-employer-section";

export function IdentitySection({ employer }: { employer: Employer }) {
  const { form, onSubmit, isDirty, isSubmitting, justSaved } =
    useEmployerSection<EmployerIdentitySchemaType>({
      section: "identity",
      schema: EmployerIdentitySchema,
      defaultValues: {
        companyName: employer.companyName,
        companyEmail: employer.companyEmail ?? "",
        companyWebsite: employer.companyWebsite ?? "",
        companyLogo: undefined,
      },
      // The file has been uploaded by the time we get here; carrying it in the
      // form state would upload it a second time on the next save.
      getResetValues: (values) => ({ ...values, companyLogo: undefined }),
    });

  return (
    <ProfileSectionCard
      id="identity"
      title="Company details"
      description="How candidates recognise and reach you."
      isDirty={isDirty}
      isSubmitting={isSubmitting}
      justSaved={justSaved}
      onSubmit={onSubmit}
    >
      <Form {...form}>
        <div className="flex flex-col gap-4">
          <TextInputField
            control={form.control}
            name="companyName"
            label="Company name"
            placeholder="e.g. Meta Platforms, Inc."
          />
          <div className="flex flex-col gap-4 sm:flex-row">
            <TextInputField
              control={form.control}
              type="email"
              name="companyEmail"
              label="Company email"
              placeholder="hello@company.com"
            />
            <TextInputField
              control={form.control}
              type="url"
              name="companyWebsite"
              label="Company website"
              placeholder="company.com"
            />
          </div>
          <div className="flex items-end gap-4">
            {/* The logo already in use, next to the field that replaces it —
                a bare file input gave no sign of what was currently set. */}
            <Avatar
              name={employer.companyName}
              src={employer.companyLogoUrl}
              size={56}
              className="shrink-0 rounded-2xl"
            />
            <FileUploadField
              control={form.control}
              name="companyLogo"
              label="Company logo"
            />
          </div>
        </div>
      </Form>
    </ProfileSectionCard>
  );
}
