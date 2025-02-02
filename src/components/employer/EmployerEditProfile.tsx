"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import RichTextEditor from "@/components/RichTextEditor";
import { draftToMarkdown } from "markdown-draft-js";
import Select from "@/components/ui/select";
import { industryTypes } from "@/lib/company-types";
import LoadingButton from "@/components/LoadingButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { Employer } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { PlusIcon, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import {
  EmployerProfileSchema,
  EmployerProfileSchemaType,
} from "@/schema/employer-profile";
import { updateEmployerProfile } from "@/app/_services/employer";

interface EmployerProfileProps {
  employer: Employer & { perks: { name: string }[] };
}

export default function EmployerEditProfile({
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
}: EmployerProfileProps) {
  const router = useRouter();
  const { toast } = useToast();

  const defaultValues: EmployerProfileSchemaType = {
    companyName,
    companyEmail: companyEmail ?? "",
    companyWebsite: companyWebsite ?? "",
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
    setFocus,
    formState: { isSubmitting },
  } = form;

  const {
    fields: perksFields,
    append: perksAppend,
    remove: perksRemove,
  } = useFieldArray({
    control: control,
    name: "perks" as const,
  });

  async function onSubmit(values: EmployerProfileSchemaType) {
    const updatedEmployerProfile = await updateEmployerProfile(id, values);
    if (updatedEmployerProfile) {
      router.push("/employer/profile");
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
          <FormField
            control={control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company name</FormLabel>
                <FormControl>
                  <Input
                    id="companyName"
                    placeholder="e.g. Meta Platforms, Inc."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="companyEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company email</FormLabel>
                <FormControl>
                  <Input
                    id="companyEmail"
                    placeholder="Email"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="companyWebsite"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company website</FormLabel>
                <FormControl>
                  <Input
                    id="companyWebsite"
                    placeholder="Website"
                    type="url"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="companyLogo"
            render={({ field: { value, ...fieldValue } }) => (
              <FormItem>
                <FormLabel>Company logo</FormLabel>
                <FormControl>
                  <Input
                    {...fieldValue}
                    id="companyLogo"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      fieldValue.onChange(file);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="industry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Industry</FormLabel>
                <FormControl>
                  <Select {...field} id="industry">
                    <option value="" hidden>
                      Select an option
                    </option>
                    {industryTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input id="location" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-3">
            <FormLabel>Perks</FormLabel>
            {perksFields.map((field, index) => (
              <FormItem
                key={field.id}
                className="flex flex-row items-center space-y-0"
              >
                <FormControl>
                  <Controller
                    control={control}
                    name={`perks.${index}.name`}
                    render={({ field }) => (
                      <Input {...field} id={`perks-${index}`} />
                    )}
                  />
                </FormControl>
                <Button
                  variant="link"
                  size="icon"
                  type="button"
                  onClick={() => perksRemove(index)}
                >
                  <XIcon size="16px" />
                </Button>
              </FormItem>
            ))}
            <div>
              <Button
                type="button"
                variant="link"
                size="sm"
                className="flex items-center gap-2 px-0"
                onClick={() => perksAppend({ name: "" })}
              >
                <PlusIcon size="16px" />
                <span className="text-xs">Add perks</span>
              </Button>
            </div>
          </div>
          <FormField
            control={control}
            name="about"
            render={({ field: { value, onChange, ref } }) => (
              <FormItem>
                <Label onClick={() => setFocus("about")}>About</Label>
                <FormControl>
                  <RichTextEditor
                    initialState={value}
                    onChange={(draft) => onChange(draftToMarkdown(draft))}
                    ref={ref}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="pitch"
            render={({ field: { value, onChange, ref } }) => (
              <FormItem>
                <Label onClick={() => setFocus("pitch")}>Pitch</Label>
                <FormControl>
                  <RichTextEditor
                    initialState={value}
                    onChange={(draft) => onChange(draftToMarkdown(draft))}
                    ref={ref}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <LoadingButton type="submit" loading={isSubmitting}>
            Update profile
          </LoadingButton>
        </form>
      </Form>
    </main>
  );
}
