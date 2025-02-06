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
import LoadingButton from "@/components/LoadingButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { Applicant } from "@prisma/client";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { PlusIcon, XIcon } from "lucide-react";
import {
  EMPLOYMENT_TYPES,
  AVAILABILITY_TYPES,
  LOCATION_TYPES,
} from "@/constants/tags";
import { Checkbox } from "../ui/checkbox";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { updateApplicantProfile } from "@/app/_services/applicant";
import {
  ApplicantProfileSchema,
  ApplicantProfileSchemaType,
} from "@/schema/applicant-profile";

interface ApplicantProfileProps {
  applicant: Applicant & { skills: { name: string }[] } & {
    languages: { name: string }[];
  } & { preferredLocations: { name: string }[] };
}

export default function ApplicantEditProfile({
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
}: ApplicantProfileProps) {
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
    setFocus,
    formState: { isSubmitting },
  } = form;

  const {
    fields: skillsFields,
    append: skillsAppend,
    remove: skillsRemove,
  } = useFieldArray({
    control: control,
    name: "skills" as const,
  });

  const {
    fields: languagesFields,
    append: languagesAppend,
    remove: languagesRemove,
  } = useFieldArray({
    control: control,
    name: "languages" as const,
  });

  const {
    fields: preferredLocationsFields,
    append: preferredLocationsAppend,
    remove: preferredLocationsRemove,
  } = useFieldArray({
    control: control,
    name: "preferredLocations" as const,
  });

  async function onSubmit(values: ApplicantProfileSchemaType) {
    const updatedApplicantProfile = await updateApplicantProfile(id, values);
    if (updatedApplicantProfile) {
      router.push("/applicant/profile");
      toast({
        title: "Your applicant profile has been updated",
      });
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
                    <Input id="firstName" {...field} />
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
                    <Input id="lastName" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={control}
            name="profession"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel>Profession</FormLabel>
                <FormControl>
                  <Input
                    id="profession"
                    placeholder="e.g. Frontend Developer"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between space-x-4">
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem className="grow">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input id="email" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="grow">
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <Input id="phoneNumber" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-between space-x-4">
            <FormField
              control={control}
              name="location"
              render={({ field }) => (
                <FormItem className="grow">
                  <FormLabel>Current Location</FormLabel>
                  <FormControl>
                    <Input id="location" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="salaryExpectation"
              render={({ field }) => (
                <FormItem className="grow">
                  <FormLabel>Salary expectation</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Controller
            control={control}
            name="experienced"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Work experience</FormLabel>
                <FormControl className="py-2">
                  <RadioGroup
                    value={field.value.toString()}
                    onValueChange={(value) => field.onChange(value === "true")}
                    className="flex flex-wrap gap-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id="noExperience" />
                      <FormLabel htmlFor="noExperience" className="font-normal">
                        No experience
                      </FormLabel>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true" id="withExperience" />
                      <FormLabel
                        htmlFor="withExperience"
                        className="font-normal"
                      >
                        With experience
                      </FormLabel>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-3">
            <FormLabel>Skills</FormLabel>
            {skillsFields.map((field, index) => (
              <FormItem
                key={field.id}
                className="flex flex-row items-center space-y-0"
              >
                <FormControl>
                  <Controller
                    control={control}
                    name={`skills.${index}.name`}
                    render={({ field }) => (
                      <Input {...field} id={`skills-${index}`} />
                    )}
                  />
                </FormControl>
                <Button
                  variant="link"
                  size="icon"
                  type="button"
                  onClick={() => skillsRemove(index)}
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
                onClick={() => skillsAppend({ name: "" })}
              >
                <PlusIcon size="16px" />
                <span className="text-xs">Add skill</span>
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <FormLabel>Languages</FormLabel>
            {languagesFields.map((field, index) => (
              <FormItem
                key={field.id}
                className="flex flex-row items-center space-y-0"
              >
                <FormControl>
                  <Controller
                    control={control}
                    name={`languages.${index}.name`}
                    render={({ field }) => (
                      <Input {...field} id={`languages-${index}`} />
                    )}
                  />
                </FormControl>
                <Button
                  variant="link"
                  size="icon"
                  type="button"
                  onClick={() => languagesRemove(index)}
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
                onClick={() => languagesAppend({ name: "" })}
              >
                <PlusIcon size="16px" />
                <span className="text-xs">Add language</span>
              </Button>
            </div>
          </div>
          <FormField
            control={control}
            name="availability"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Availability</FormLabel>
                <FormControl className="py-2">
                  <RadioGroup
                    defaultValue=""
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                    className="flex flex-wrap gap-6"
                  >
                    {AVAILABILITY_TYPES.map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <RadioGroupItem value={type} id={type} />
                        <Label htmlFor={type} className="font-normal">
                          {type}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Controller
            control={control}
            name="preferredLocationTypes"
            render={({ field }) => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel>Preferred location types</FormLabel>
                </div>
                <div className="flex flex-wrap gap-6">
                  {LOCATION_TYPES.map((item) => (
                    <div
                      key={item}
                      className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={(field.value || []).includes(item)}
                          onCheckedChange={(checked) => {
                            const newValue = checked
                              ? [...(field.value || []), item]
                              : (field.value || []).filter(
                                  (value) => value !== item,
                                );
                            field.onChange(newValue);
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">{item}</FormLabel>
                    </div>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Controller
            control={control}
            name="preferredEmploymentTypes"
            render={({ field }) => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel>Preferred employment types</FormLabel>
                </div>
                <div className="flex flex-wrap gap-6">
                  {EMPLOYMENT_TYPES.map((item) => (
                    <div
                      key={item}
                      className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={(field.value || []).includes(item)}
                          onCheckedChange={(checked) => {
                            const newValue = checked
                              ? [...(field.value || []), item]
                              : (field.value || []).filter(
                                  (value) => value !== item,
                                );
                            field.onChange(newValue);
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">{item}</FormLabel>
                    </div>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-3">
            <FormLabel>Preferred locations</FormLabel>
            {preferredLocationsFields.map((field, index) => (
              <FormItem
                key={field.id}
                className="flex flex-row items-center space-y-0"
              >
                <FormControl>
                  <Controller
                    control={control}
                    name={`preferredLocations.${index}.name`}
                    render={({ field }) => (
                      <Input {...field} id={`preferredLocations-${index}`} />
                    )}
                  />
                </FormControl>
                <Button
                  variant="link"
                  size="icon"
                  type="button"
                  onClick={() => preferredLocationsRemove(index)}
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
                onClick={() => preferredLocationsAppend({ name: "" })}
              >
                <PlusIcon size="16px" />
                <span className="text-xs">Add location</span>
              </Button>
            </div>
          </div>
          <FormField
            control={control}
            name="about"
            render={({ field: { value, onChange, ref } }) => (
              <FormItem>
                <Label onClick={() => setFocus("about")}>About me</Label>
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
