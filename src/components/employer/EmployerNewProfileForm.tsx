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
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import RichTextEditor from "@/components/RichTextEditor";
import { draftToMarkdown } from "markdown-draft-js";
import Select from "@/components/ui/select";
import { industryTypes } from "@/lib/company-types";
import LoadingButton from "../LoadingButton";
import {
  createEmployerProfileSchema,
  CreateEmployerProfileValues,
} from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createEmployerProfile } from "@/app/profile/actions";

export default function EmployerNewProfileForm() {
  const form = useForm<CreateEmployerProfileValues>({
    resolver: zodResolver(createEmployerProfileSchema),
  });

  const {
    handleSubmit,
    control,
    setFocus,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: CreateEmployerProfileValues) {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });
    try {
      await createEmployerProfile(formData);
    } catch (error) {
      alert("Something went wrong, please try again.");
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
          <FormField
            control={control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company name</FormLabel>
                <FormControl>
                  <Input id="companyName" placeholder="e.g. Meta Platforms, Inc." {...field} />
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
                  <Input id="companyWebsite" placeholder="Website" type="url" {...field} />
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
                  <Select {...field} id="industry" defaultValue="">
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
          <FormField
            control={control}
            name="about"
            render={({ field }) => (
              <FormItem>
                <Label onClick={() => setFocus("about")}>About</Label>
                <FormControl>
                  <RichTextEditor
                    onChange={(draft) => field.onChange(draftToMarkdown(draft))}
                    ref={field.ref}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="pitch"
            render={({ field }) => (
              <FormItem>
                <Label onClick={() => setFocus("pitch")}>Pitch</Label>
                <FormControl>
                  <RichTextEditor
                    onChange={(draft) => field.onChange(draftToMarkdown(draft))}
                    ref={field.ref}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <LoadingButton type="submit" loading={isSubmitting}>
            Submit
          </LoadingButton>
        </form>
      </Form>
    </div>
  );
}
