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
import {
  createApplicantProfileSchema,
  CreateApplicantProfileValues,
} from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { objectToFormData } from "@/lib/form-data";
import { createApplicantProfile } from "@/actions/applicants";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  availabilityTypes,
  employmentTypes,
  locationTypes,
} from "@/lib/job-types";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { PlusIcon, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

export default function ApplicantNewProfileForm() {
  const router = useRouter();
  const { toast } = useToast();

  const defaultValues: CreateApplicantProfileValues = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    location: "",
    about: "",
    profession: "",
    experienced: false,
    skills: [],
    languages: [],
    availability: "",
    preferredEmploymentTypes: [],
    preferredLocationTypes: [],
    preferredLocations: [],
    salaryExpectation: "",
  };

  const form = useForm<CreateApplicantProfileValues>({
    resolver: zodResolver(createApplicantProfileSchema),
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

  async function onSubmit(values: CreateApplicantProfileValues) {
    const formData = objectToFormData(values);
    const createdApplicant = await createApplicantProfile(formData);
    if (createdApplicant) {
      router.push("/applicant/profile");
      toast({
        title: "Your applicant profile has been created",
      });
    }
  }

  return (
    <div className="space-y-6 rounded-lg border p-4">
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
          <div className="flex flex-wrap justify-between gap-4">
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
          <div className="flex flex-wrap justify-between gap-4">
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
                    <Input {...field} type="number" />
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
                    {availabilityTypes.map((type) => (
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
                  {locationTypes.map((item) => (
                    <div key={item} className="flex flex-row items-start gap-3">
                      <FormControl>
                        <Checkbox
                          id={`locationTypes-${item}`}
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
                      <FormLabel
                        className="font-normal"
                        htmlFor={`locationTypes-${item}`}
                      >
                        {item}
                      </FormLabel>
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
                  {employmentTypes.map((item) => (
                    <div key={item} className="flex flex-row items-start gap-3">
                      <FormControl>
                        <Checkbox
                          id={`employmentTypes-${item}`}
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
                      <FormLabel
                        className="font-normal"
                        htmlFor={`employmentTypes-${item}`}
                      >
                        {item}
                      </FormLabel>
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
            Submit
          </LoadingButton>
        </form>
      </Form>
    </div>
  );
}
