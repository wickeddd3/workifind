"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";

import { type Applicant } from "@/entities/applicant";
import {
  AVAILABILITY_TYPES,
  EMPLOYMENT_TYPES,
  LOCATION_TYPES,
  WORK_EXPERIENCE_TYPES,
} from "@/shared/constants/tags";
import { Button } from "@/shared/ui/button";
import { Form } from "@/shared/ui/form";
import { CheckboxGroupField } from "@/shared/ui/form-fields/CheckboxGroupField";
import { DynamicListField } from "@/shared/ui/form-fields/DynamicListField";
import { RadioGroupField } from "@/shared/ui/form-fields/RadioGroupField";
import { RichTextField } from "@/shared/ui/form-fields/RichEditorTextField";
import { TextInputField } from "@/shared/ui/form-fields/TextInputField";
import { LoadingButton } from "@/shared/ui/LoadingButton";
import { useToast } from "@/shared/ui/use-toast";

import { updateApplicantAction } from "../api/applicant.action";
import {
  ApplicantProfileSchema,
  type ApplicantProfileSchemaType,
} from "../model/schema";

export function ProfileForm({
  applicant: {
    id,
    firstName,
    lastName,
    email,
    phoneNumber,
    location,
    about,
    profession,
    experienced,
    skills,
    languages,
    availability,
    preferredEmploymentTypes,
    preferredLocationTypes,
    preferredLocations,
    salaryExpectation,
  },
}: {
  applicant: Applicant;
}) {
  const router = useRouter();
  const { toast } = useToast();

  const defaultValues: ApplicantProfileSchemaType = {
    firstName,
    lastName,
    email,
    phoneNumber: phoneNumber ?? "",
    location: location ?? "",
    about: about ?? "",
    profession: profession ?? "",
    experienced: experienced,
    skills: skills ?? [],
    languages: languages ?? [],
    availability: availability ?? "",
    preferredEmploymentTypes: preferredEmploymentTypes ?? [],
    preferredLocationTypes: preferredLocationTypes ?? [],
    preferredLocations: preferredLocations ?? [],
    salaryExpectation: salaryExpectation,
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

  async function onSubmit(values: ApplicantProfileSchemaType) {
    const response = await updateApplicantAction(id, values);
    if (response.success) {
      router.push("/applicant/profile");
      router.refresh();
      toast({
        title: "Profile updated",
      });
    }
  }

  const locationTypes = LOCATION_TYPES.map((type) => type.value);
  const employmentTypes = EMPLOYMENT_TYPES.map((type) => type.value);

  return (
    <div className="m-auto my-6 max-w-3xl space-y-6 px-4">
      <div className="flex flex-col gap-1 px-1">
        <h1 className="text-xl font-bold text-gray-900">Edit your profile</h1>
        <p className="text-sm text-muted-foreground">
          Keep your profile up to date so employers can find you.
        </p>
      </div>
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-card md:p-8">
        <Form {...form}>
          <form
            className="space-y-5"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-4">
              <TextInputField
                control={control}
                name="firstName"
                label="First name"
              />
              <TextInputField
                control={control}
                name="lastName"
                label="Last name"
              />
            </div>
            <TextInputField
              control={control}
              name="profession"
              label="Profession"
              placeholder="e.g. Frontend Developer"
            />
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-4">
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
                label="Phone number"
              />
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-4">
              <TextInputField
                control={control}
                name="location"
                label="Current location"
              />
              <TextInputField
                control={control}
                type="number"
                name="salaryExpectation"
                label="Salary expectation"
              />
            </div>
            <RadioGroupField
              control={control}
              options={WORK_EXPERIENCE_TYPES}
              name="experienced"
              label="Work experience"
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
            <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-5">
              <Button asChild variant="ghost">
                <Link href="/applicant/profile">Cancel</Link>
              </Button>
              <LoadingButton type="submit" loading={isSubmitting}>
                Save changes
              </LoadingButton>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
