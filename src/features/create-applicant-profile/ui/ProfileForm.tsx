"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import {
  CertificationEntryFields,
  EducationEntryFields,
  EMPTY_CERTIFICATION_ENTRY,
  EMPTY_EDUCATION_ENTRY,
  EMPTY_EXPERIENCE_ENTRY,
  ExperienceEntryFields,
} from "@/entities/applicant/client";
import {
  AVAILABILITY_TYPES,
  EMPLOYMENT_TYPES,
  LOCATION_TYPES,
  WORK_EXPERIENCE_TYPES,
} from "@/shared/constants/tags";
import { Form } from "@/shared/ui/form";
import { CheckboxGroupField } from "@/shared/ui/form-fields/CheckboxGroupField";
import { DynamicListField } from "@/shared/ui/form-fields/DynamicListField";
import { RadioGroupField } from "@/shared/ui/form-fields/RadioGroupField";
import { RepeatableFieldset } from "@/shared/ui/form-fields/RepeatableFieldset";
import { RichTextField } from "@/shared/ui/form-fields/RichEditorTextField";
import { TextInputField } from "@/shared/ui/form-fields/TextInputField";
import { LoadingButton } from "@/shared/ui/LoadingButton";
import { useToast } from "@/shared/ui/use-toast";

import { createApplicantAction } from "../api/applicant.action";
import {
  ApplicantProfileSchema,
  type ApplicantProfileSchemaType,
} from "../model/schema";

/**
 * A titled block for one of the repeatable CV sections.
 *
 * The rest of this form is flat, one labelled field after another, so the
 * record lists need a heading of their own — without one, a list of bordered
 * role cards reads as belonging to whichever field happens to sit above it.
 */
function RecordGroup({
  label,
  hint,
  children,
}: {
  label: string;
  hint: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 border-t border-border pt-5">
      <div className="flex flex-col gap-0.5">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">{hint}</p>
      </div>
      {children}
    </div>
  );
}

export function ProfileForm() {
  const router = useRouter();
  const { toast } = useToast();

  const defaultValues: ApplicantProfileSchemaType = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    location: "",
    about: "",
    profession: "",
    experienced: "No experience",
    skills: [],
    languages: [],
    // Empty rather than seeded with one blank row: an untouched blank role
    // would fail validation on submit and block a signup the applicant never
    // asked to fill in.
    experiences: [],
    educations: [],
    certifications: [],
    availability: "",
    preferredEmploymentTypes: [],
    preferredLocationTypes: [],
    preferredLocations: [],
    salaryExpectation: "",
  };

  const form = useForm<ApplicantProfileSchemaType>({
    resolver: zodResolver(ApplicantProfileSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  const {
    fields: skillsFields,
    append: skillsAppend,
    remove: skillsRemove,
  } = useFieldArray<ApplicantProfileSchemaType, "skills">({
    control: control,
    name: "skills",
  });

  const {
    fields: languagesFields,
    append: languagesAppend,
    remove: languagesRemove,
  } = useFieldArray<ApplicantProfileSchemaType, "languages">({
    control: control,
    name: "languages",
  });

  const {
    fields: preferredLocationsFields,
    append: preferredLocationsAppend,
    remove: preferredLocationsRemove,
  } = useFieldArray<ApplicantProfileSchemaType, "preferredLocations">({
    control: control,
    name: "preferredLocations",
  });

  const {
    fields: experienceFields,
    append: experienceAppend,
    remove: experienceRemove,
  } = useFieldArray<ApplicantProfileSchemaType, "experiences">({
    control: control,
    name: "experiences",
  });

  const {
    fields: educationFields,
    append: educationAppend,
    remove: educationRemove,
  } = useFieldArray<ApplicantProfileSchemaType, "educations">({
    control: control,
    name: "educations",
  });

  const {
    fields: certificationFields,
    append: certificationAppend,
    remove: certificationRemove,
  } = useFieldArray<ApplicantProfileSchemaType, "certifications">({
    control: control,
    name: "certifications",
  });

  // Watched so ticking "I currently work here" disables that entry's end date
  // as the form is filled in.
  const experiences = form.watch("experiences");
  const educations = form.watch("educations");

  async function onSubmit(values: ApplicantProfileSchemaType) {
    const response = await createApplicantAction(values);
    if (response.success) {
      router.push("/applicant/profile");
      toast({
        title: "Your profile is ready",
      });
    }
  }

  const locationTypes = LOCATION_TYPES.map((type) => type.value);
  const employmentTypes = EMPLOYMENT_TYPES.map((type) => type.value);

  return (
    <div className="space-y-6 rounded-2xl border border-border bg-card p-6 shadow-card">
      <div>
        <h2 className="text-md font-semibold">Profile details</h2>
        <p className="text-sm text-muted-foreground">
          Provide a applicant profile details
        </p>
      </div>
      <Form {...form}>
        <form
          className="space-y-4"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-wrap justify-between gap-4">
            <TextInputField
              control={control}
              name="firstName"
              label="First Name"
            />
            <TextInputField
              control={control}
              name="lastName"
              label="Last Name"
            />
          </div>
          <TextInputField
            control={control}
            name="profession"
            label="Profession"
            placeholder="e.g. Frontend Developer"
          />
          <div className="flex justify-between space-x-4">
            <TextInputField
              control={control}
              type="email"
              name="email"
              label="Email"
            />
            <TextInputField
              control={control}
              type="number"
              name="phoneNumber"
              label="Phone Number"
            />
          </div>
          <div className="flex justify-between space-x-4">
            <TextInputField
              control={control}
              name="location"
              label="Current Location"
            />
            <TextInputField
              control={control}
              type="number"
              name="salaryExpectation"
              label="Salary Expectation"
            />
          </div>
          <RadioGroupField
            control={control}
            options={WORK_EXPERIENCE_TYPES}
            name="experienced"
            label="Work Experience"
          />
          <DynamicListField
            control={control}
            name="skills"
            label="Skills"
            fields={skillsFields}
            append={() => skillsAppend({ name: "" })}
            remove={(index) => skillsRemove(index)}
          />

          <DynamicListField
            control={control}
            name="languages"
            label="Languages"
            fields={languagesFields}
            append={() => languagesAppend({ name: "" })}
            remove={(index) => languagesRemove(index)}
          />
          {/* The CV records. All three are optional here — the profile editor
              carries the same sections, so anyone who would rather not fill
              them in during signup loses nothing by skipping them. */}
          <RecordGroup
            label="Work experience"
            hint="The roles you've held. You can add these later too."
          >
            <RepeatableFieldset
              itemLabel="role"
              emptyPrompt="No roles added."
              fields={experienceFields}
              onAdd={() => experienceAppend(EMPTY_EXPERIENCE_ENTRY)}
              onRemove={(index) => experienceRemove(index)}
            >
              {(index) => (
                <ExperienceEntryFields
                  control={control}
                  index={index}
                  isCurrent={experiences?.[index]?.current}
                />
              )}
            </RepeatableFieldset>
          </RecordGroup>

          <RecordGroup label="Education" hint="Where you studied.">
            <RepeatableFieldset
              itemLabel="qualification"
              emptyPrompt="No education added."
              fields={educationFields}
              onAdd={() => educationAppend(EMPTY_EDUCATION_ENTRY)}
              onRemove={(index) => educationRemove(index)}
            >
              {(index) => (
                <EducationEntryFields
                  control={control}
                  index={index}
                  isCurrent={educations?.[index]?.current}
                />
              )}
            </RepeatableFieldset>
          </RecordGroup>

          <RecordGroup
            label="Certifications"
            hint="Licences and certificates you hold."
          >
            <RepeatableFieldset
              itemLabel="certificate"
              emptyPrompt="No certificates added."
              fields={certificationFields}
              onAdd={() => certificationAppend(EMPTY_CERTIFICATION_ENTRY)}
              onRemove={(index) => certificationRemove(index)}
            >
              {(index) => (
                <CertificationEntryFields control={control} index={index} />
              )}
            </RepeatableFieldset>
          </RecordGroup>

          <RadioGroupField
            control={control}
            options={AVAILABILITY_TYPES}
            name="availability"
            label="Availability"
          />
          <CheckboxGroupField
            control={control}
            options={locationTypes}
            name="preferredLocationTypes"
            label="Preferred location types"
          />
          <CheckboxGroupField
            control={control}
            options={employmentTypes}
            name="preferredEmploymentTypes"
            label="Preferred employment types"
          />
          <DynamicListField
            control={control}
            name="preferredLocations"
            label="Preferred locations"
            fields={preferredLocationsFields}
            append={() => preferredLocationsAppend({ name: "" })}
            remove={(index) => preferredLocationsRemove(index)}
          />
          <RichTextField control={control} name="about" label="About me" />
          <LoadingButton type="submit" loading={isSubmitting}>
            Submit
          </LoadingButton>
        </form>
      </Form>
    </div>
  );
}
