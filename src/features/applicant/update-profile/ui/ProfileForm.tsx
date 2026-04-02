"use client";

import { Form } from "@/shared/ui/form";
import { TextInputField } from "@/shared/ui/form-fields/TextInputField";
import { RadioGroupField } from "@/shared/ui/form-fields/RadioGroupField";
import { CheckboxGroupField } from "@/shared/ui/form-fields/CheckboxGroupField";
import { RichTextField } from "@/shared/ui/form-fields/RichEditorTextField";
import { DynamicListField } from "@/shared/ui/form-fields/DynamicListField";
import { LoadingButton } from "@/shared/ui/LoadingButton";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useToast } from "@/shared/ui/use-toast";
import {
  EMPLOYMENT_TYPES,
  AVAILABILITY_TYPES,
  LOCATION_TYPES,
  WORK_EXPERIENCE_TYPES,
} from "@/shared/constants/tags";
import {
  ApplicantProfileSchema,
  ApplicantProfileSchemaType,
} from "../model/schema";
import { Applicant } from "@/entities/applicant";
import { updateApplicantProfile } from "../model/update-profile";

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
    const updatedApplicantProfile = await updateApplicantProfile(id, values);
    if (updatedApplicantProfile) {
      router.push("/applicant/profile");
      router.refresh();
      toast({
        title: "Your applicant profile has been updated",
      });
    }
  }

  const locationTypes = LOCATION_TYPES.map((type) => type.value);
  const employmentTypes = EMPLOYMENT_TYPES.map((type) => type.value);

  return (
    <main className="m-auto space-y-6 px-4">
      <div>
        <h2 className="text-md font-semibold">Profile profile</h2>
        <p className="text-sm text-muted-foreground">Manage profile details</p>
      </div>
      <hr />
      <Form {...form}>
        <form
          className="space-y-4"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex gap-2">
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
            Update profile
          </LoadingButton>
        </form>
      </Form>
    </main>
  );
}
