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
import LoadingButton from "@/components/LoadingButton";
import {
  createApplicantProfileSchema,
  CreateApplicantProfileValues,
} from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateApplicantProfile } from "@/app/applicant/profile/actions";
import { Applicant } from "@prisma/client";

interface ApplicantProfileProps {
  applicant: Applicant;
}

export default function ApplicantEditProfile({
  applicant: { id, firstName, lastName, email, phoneNumber, location, about },
}: ApplicantProfileProps) {
  const form = useForm<CreateApplicantProfileValues>({
    resolver: zodResolver(createApplicantProfileSchema),
    defaultValues: {
      firstName,
      lastName,
      email,
      phoneNumber: phoneNumber ?? "",
      location: location ?? "",
      about: about ?? "",
    },
  });

  const {
    handleSubmit,
    control,
    setFocus,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: CreateApplicantProfileValues) {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });
    try {
      await updateApplicantProfile(id, formData);
    } catch (error) {
      alert("Something went wrong, please try again.");
    }
  }

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
          <div className="flex justify-between space-x-4">
            <FormField
              control={control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="grow">
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input id="firstName" placeholder="e.g. John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="grow">
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input id="lastName" placeholder="e.g. Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    id="email"
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
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone number</FormLabel>
                <FormControl>
                  <Input id="phoneNumber" {...field} />
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
          <LoadingButton type="submit" loading={isSubmitting}>
            Submit
          </LoadingButton>
        </form>
      </Form>
    </main>
  );
}
