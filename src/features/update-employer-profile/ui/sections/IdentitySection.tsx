"use client";

import type { Employer } from "@/entities/employer";
import {
  getLogoFileError,
  LOGO_ACCEPT,
  LOGO_UPLOAD_ENDPOINT,
} from "@/entities/employer/client";
import { Form } from "@/shared/ui/form";
import { ImageUploadField } from "@/shared/ui/form-fields/ImageUploadField";
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
        // Undefined, not the current URL: the field holds a token for a *new*
        // upload, and seeding it would make an untouched section look dirty.
        logoToken: undefined,
      },
      // The token has been spent by the time we get here; carrying it in the
      // form state would reattach the same upload on the next save.
      getResetValues: (values) => ({ ...values, logoToken: undefined }),
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
          <ImageUploadField
            control={form.control}
            name="logoToken"
            label="Company logo"
            endpoint={LOGO_UPLOAD_ENDPOINT}
            accept={LOGO_ACCEPT}
            validate={getLogoFileError}
            currentUrl={employer.companyLogoUrl}
            shape="square"
            description="JPG, PNG or WebP, up to 2MB."
          />
        </div>
      </Form>
    </ProfileSectionCard>
  );
}
