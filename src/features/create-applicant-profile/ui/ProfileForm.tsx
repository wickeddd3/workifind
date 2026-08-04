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
  EMPTY_LANGUAGE_ENTRY,
  EMPTY_PREFERRED_LOCATION_ENTRY,
  EMPTY_SKILL_ENTRY,
  ExperienceEntryFields,
  LanguageEntryFields,
  PreferencesFields,
  PreferredLocationEntryFields,
  SkillEntryFields,
} from "@/entities/applicant/client";
import { WORK_EXPERIENCE_TYPES } from "@/shared/constants/tags";
import { Form } from "@/shared/ui/form";
import { RadioGroupField } from "@/shared/ui/form-fields/RadioGroupField";
import { RepeatableFieldset } from "@/shared/ui/form-fields/RepeatableFieldset";
import { RichTextField } from "@/shared/ui/form-fields/RichEditorTextField";
import { TextInputField } from "@/shared/ui/form-fields/TextInputField";
import {
  useFormWizard,
  type WizardStep,
} from "@/shared/ui/form-wizard/useFormWizard";
import { WizardNav } from "@/shared/ui/form-wizard/WizardNav";
import { WizardPanel } from "@/shared/ui/form-wizard/WizardPanel";
import { WizardStepper } from "@/shared/ui/form-wizard/WizardStepper";
import { Label } from "@/shared/ui/label";
import { useToast } from "@/shared/ui/use-toast";

import { createApplicantAction } from "../api/applicant.action";
import {
  ApplicantProfileSchema,
  type ApplicantProfileSchemaType,
} from "../model/schema";

/**
 * The profile in the order it makes sense to answer it, not the order the
 * schema declares it.
 *
 * Nine sections on one screen is what this form used to be, and the required
 * fields — three of them — were buried among six optional record lists. Split
 * this way the first step is the only one that can stop anyone, and everything
 * after it is a list they may leave empty.
 */
const STEPS: WizardStep<ApplicantProfileSchemaType>[] = [
  {
    id: "basics",
    label: "Basics",
    title: "Tell us about you",
    hint: "How employers will see and reach you.",
    fields: [
      "firstName",
      "lastName",
      "profession",
      "email",
      "phoneNumber",
      "location",
      "experienced",
    ],
  },
  {
    id: "strengths",
    label: "Strengths",
    title: "What you work with",
    hint: "Employers match these against their job descriptions. Add what you have now — you can extend the list any time.",
    fields: ["skills", "languages"],
  },
  {
    id: "history",
    label: "History",
    title: "Your background",
    hint: "Roles, qualifications and certificates. All optional here, and all editable from your profile later.",
    fields: ["experiences", "educations", "certifications"],
  },
  {
    id: "preferences",
    label: "Preferences",
    title: "What you're looking for",
    hint: "These are the filters employers search on, so they decide which searches you turn up in.",
    fields: [
      "availability",
      "salaryExpectation",
      "preferredEmploymentTypes",
      "preferredLocationTypes",
      "preferredLocations",
    ],
  },
  {
    id: "about",
    label: "About",
    title: "Anything else worth knowing",
    hint: "A short introduction in your own words. It sits at the top of your profile.",
    fields: ["about"],
  },
];

/**
 * A titled block for one of the repeatable record lists.
 *
 * Several steps carry more than one list, and without a heading each a run of
 * bordered entry cards reads as belonging to whichever list happens to sit
 * above it. The rule is dropped on the first block in a step, where there is
 * nothing above it to separate from.
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
    <div className="flex flex-col gap-3 border-t border-border pt-5 first:border-t-0 first:pt-0">
      <div className="flex flex-col gap-0.5">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">{hint}</p>
      </div>
      {children}
    </div>
  );
}

export function ProfileForm({ onExit }: { onExit?: () => void }) {
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
    step,
    index: stepIndex,
    furthest,
    isFirst,
    isLast,
    goNext,
    goBack,
    goTo,
    goToFirstInvalid,
    containerRef,
  } = useFormWizard({ form, steps: STEPS });

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

    if (!response.success) {
      toast({
        variant: "destructive",
        title: "We couldn't create your profile",
        description: "Something went wrong on our end. Please try again.",
      });
      return;
    }

    router.push("/applicant/profile");
    toast({ title: "Your profile is ready" });
  }

  return (
    <div
      ref={containerRef}
      className="scroll-mt-24 rounded-2xl border border-border bg-card p-5 shadow-card md:p-6"
    >
      <WizardStepper
        steps={STEPS}
        index={stepIndex}
        furthest={furthest}
        onStepSelect={(target) => void goTo(target)}
        className="mb-6 md:mb-8"
      />

      <Form {...form}>
        {/* Continue is a submit button, so Enter in a text field advances the
            step the way it would submit any other form. Only the last step
            hands over to `handleSubmit`; before that a submit means "validate
            what is on screen and move on". */}
        <form
          className="flex flex-col gap-6"
          noValidate
          onSubmit={
            isLast
              ? handleSubmit(onSubmit, goToFirstInvalid)
              : (event) => {
                  event.preventDefault();
                  void goNext();
                }
          }
        >
          {step.id === "basics" && (
            <WizardPanel id={step.id} title={step.title} hint={step.hint}>
              <div className="grid gap-4 sm:grid-cols-2">
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
              <div className="grid gap-4 sm:grid-cols-2">
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
              <TextInputField
                control={control}
                name="location"
                label="Current location"
              />
              <RadioGroupField
                control={control}
                options={WORK_EXPERIENCE_TYPES}
                name="experienced"
                label="Work experience"
              />
            </WizardPanel>
          )}

          {step.id === "strengths" && (
            <WizardPanel id={step.id} title={step.title} hint={step.hint}>
              <RecordGroup
                label="Skills"
                hint="What you work with, and how well."
              >
                <RepeatableFieldset
                  variant="row"
                  itemLabel="skill"
                  emptyPrompt="No skills added."
                  fields={skillsFields}
                  onAdd={() => skillsAppend(EMPTY_SKILL_ENTRY)}
                  onRemove={(index) => skillsRemove(index)}
                >
                  {(index) => (
                    <SkillEntryFields control={control} index={index} />
                  )}
                </RepeatableFieldset>
              </RecordGroup>

              <RecordGroup label="Languages" hint="Languages you can work in.">
                <RepeatableFieldset
                  variant="row"
                  itemLabel="language"
                  emptyPrompt="No languages added."
                  fields={languagesFields}
                  onAdd={() => languagesAppend(EMPTY_LANGUAGE_ENTRY)}
                  onRemove={(index) => languagesRemove(index)}
                >
                  {(index) => (
                    <LanguageEntryFields control={control} index={index} />
                  )}
                </RepeatableFieldset>
              </RecordGroup>
            </WizardPanel>
          )}

          {step.id === "history" && (
            <WizardPanel id={step.id} title={step.title} hint={step.hint}>
              <RecordGroup
                label="Work experience"
                hint="The roles you've held."
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
            </WizardPanel>
          )}

          {step.id === "preferences" && (
            <WizardPanel id={step.id} title={step.title} hint={step.hint}>
              <PreferencesFields control={control} />
              <div className="flex flex-col gap-3">
                <Label>Locations</Label>
                <RepeatableFieldset
                  variant="row"
                  itemLabel="location"
                  emptyPrompt="No preferred locations added."
                  fields={preferredLocationsFields}
                  onAdd={() =>
                    preferredLocationsAppend(EMPTY_PREFERRED_LOCATION_ENTRY)
                  }
                  onRemove={(index) => preferredLocationsRemove(index)}
                >
                  {(index) => (
                    <PreferredLocationEntryFields
                      control={control}
                      index={index}
                    />
                  )}
                </RepeatableFieldset>
              </div>
            </WizardPanel>
          )}

          {step.id === "about" && (
            <WizardPanel id={step.id} title={step.title} hint={step.hint}>
              <RichTextField control={control} name="about" label="About me" />
            </WizardPanel>
          )}

          <WizardNav
            isLast={isLast}
            isSubmitting={isSubmitting}
            backLabel={isFirst ? "Change role" : "Back"}
            onBack={isFirst ? onExit : goBack}
            submitLabel="Create profile"
          />
        </form>
      </Form>
    </div>
  );
}
