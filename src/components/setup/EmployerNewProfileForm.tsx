"use client";

import { Form } from "@/components/ui/form";
import { TextInputField } from "@/components/common/TextInputField";
import { FileUploadField } from "@/components/common/FileUploadField";
import { SelectField } from "@/components/common/SelectField";
import { DynamicListField } from "@/components/common/DynamicListField";
import { RichTextField } from "@/components/common/RichEditorTextField";
import LoadingButton from "@/components/LoadingButton";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { INDUSTRY_TYPES } from "@/constants/tags";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import {
  EmployerProfileSchema,
  EmployerProfileSchemaType,
} from "@/schema/employer-profile";
import { createEmployerProfile } from "@/app/_services/employer";

export default function EmployerNewProfileForm() {
  const router = useRouter();
  const { toast } = useToast();

  const defaultValues: EmployerProfileSchemaType = {
    companyName: "",
    companyEmail: "",
    companyWebsite: "",
    industry: "",
    location: "",
    about: "",
    pitch: "",
    perks: [],
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
    const createdEmployerProfile = await createEmployerProfile(values);
    if (createdEmployerProfile) {
      router.push("/employer/profile");
      toast({
        title: "Your employer profile has been created",
      });
    }
  }

  return (
    <div className="space-y-6 rounded-lg border p-4">
      <div>
        <h2 className="text-md font-semibold">Profile details</h2>
        <p className="text-sm text-muted-foreground">
          Provide a employer profile details
        </p>
      </div>
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
            Submit
          </LoadingButton>
        </form>
      </Form>
    </div>
  );
}
