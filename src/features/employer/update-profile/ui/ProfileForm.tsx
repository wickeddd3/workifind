"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";

import { type Employer } from "@/entities/employer";
import { INDUSTRY_TYPES } from "@/shared/constants/tags";
import { Form } from "@/shared/ui/form";
import { DynamicListField } from "@/shared/ui/form-fields/DynamicListField";
import { FileUploadField } from "@/shared/ui/form-fields/FileUploadField";
import { RichTextField } from "@/shared/ui/form-fields/RichEditorTextField";
import { SelectField } from "@/shared/ui/form-fields/SelectField";
import { TextInputField } from "@/shared/ui/form-fields/TextInputField";
import { LoadingButton } from "@/shared/ui/LoadingButton";
import { useToast } from "@/shared/ui/use-toast";

import { updateEmployerAction } from "../api/employer.action";
import {
  EmployerProfileSchema,
  type EmployerProfileSchemaType,
} from "../model/schema";

export function ProfileForm({
  employer: {
    id,
    companyName,
    companyEmail,
    companyWebsite,
    industry,
    location,
    about,
    pitch,
    perks,
  },
}: {
  employer: Employer;
}) {
  const router = useRouter();
  const { toast } = useToast();

  const defaultValues: EmployerProfileSchemaType = {
    companyName,
    companyEmail: companyEmail ?? "",
    companyWebsite: companyWebsite ?? "",
    companyLogo: undefined,
    industry: industry ?? "",
    location: location ?? "",
    about: about ?? "",
    pitch: pitch ?? "",
    perks: perks ?? [],
  };

  const form = useForm<EmployerProfileSchemaType>({
    resolver: zodResolver(EmployerProfileSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  const {
    fields: perksFields,
    append: perksAppend,
    remove: perksRemove,
  } = useFieldArray<EmployerProfileSchemaType, "perks">({
    control: control,
    name: "perks",
  });

  async function onSubmit(values: EmployerProfileSchemaType) {
    const response = await updateEmployerAction(id, values);
    if (response.success) {
      router.push("/employer/profile");
      router.refresh();
      toast({
        title: "Your employer profile has been updated",
      });
    }
  }

  return (
    <main className="m-auto space-y-6 px-4">
      <div>
        <h2 className="text-md font-semibold">Employer profile</h2>
        <p className="text-sm text-muted-foreground">Manage profile details</p>
      </div>
      <hr />
      <Form {...form}>
        <form
          className="space-y-4"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextInputField
            control={control}
            name="companyName"
            label="Company Name"
            placeholder="e.g. Meta Platforms, Inc."
          />
          <TextInputField
            control={control}
            type="email"
            name="companyEmail"
            label="Company Email"
            placeholder="Email"
          />
          <TextInputField
            control={control}
            type="url"
            name="companyWebsite"
            label="Company Website"
            placeholder="Website"
          />
          <FileUploadField
            control={control}
            name="companyLogo"
            label="Company Logo"
          />
          <SelectField
            control={control}
            name="industry"
            label="Industry"
            options={INDUSTRY_TYPES}
          />
          <TextInputField control={control} name="location" label="Location" />
          <DynamicListField
            control={control}
            name="perks"
            label="Perks"
            fields={perksFields}
            append={() => perksAppend({ name: "" })}
            remove={(index) => perksRemove(index)}
          />
          <RichTextField control={control} name="about" label="About" />
          <RichTextField control={control} name="pitch" label="Pitch" />
          <LoadingButton type="submit" loading={isSubmitting}>
            Update profile
          </LoadingButton>
        </form>
      </Form>
    </main>
  );
}
