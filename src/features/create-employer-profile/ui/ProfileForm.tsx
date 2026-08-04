"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";

import { INDUSTRY_TYPES } from "@/shared/constants/tags";
import { Form } from "@/shared/ui/form";
import { DynamicListField } from "@/shared/ui/form-fields/DynamicListField";
import { FileUploadField } from "@/shared/ui/form-fields/FileUploadField";
import { RichTextField } from "@/shared/ui/form-fields/RichEditorTextField";
import { SelectField } from "@/shared/ui/form-fields/SelectField";
import { TextInputField } from "@/shared/ui/form-fields/TextInputField";
import {
  useFormWizard,
  type WizardStep,
} from "@/shared/ui/form-wizard/useFormWizard";
import { WizardNav } from "@/shared/ui/form-wizard/WizardNav";
import { WizardPanel } from "@/shared/ui/form-wizard/WizardPanel";
import { WizardStepper } from "@/shared/ui/form-wizard/WizardStepper";
import { useToast } from "@/shared/ui/use-toast";

import { createEmployerAction } from "../api/employer.action";
import {
  EmployerProfileSchema,
  type EmployerProfileSchemaType,
} from "../model/schema";

/**
 * Three steps, sorted by who the answer is for: what identifies the company,
 * how to reach it, and what it is like to work there.
 *
 * The last step is the only one that takes writing, and putting it last means
 * an employer meets the two required fields before being asked for prose.
 */
const STEPS: WizardStep<EmployerProfileSchemaType>[] = [
  {
    id: "company",
    label: "Company",
    title: "About the company",
    hint: "What candidates see first, on your company page and on every job you post.",
    fields: ["companyName", "industry", "location", "companyLogo"],
  },
  {
    id: "contact",
    label: "Contact",
    title: "Where to find you",
    hint: "Optional, but a company with a site and an address gets more applications than one without.",
    fields: ["companyEmail", "companyWebsite"],
  },
  {
    id: "culture",
    label: "Culture",
    title: "What it's like to work here",
    hint: "Your pitch to candidates. You can leave this for now and write it from your profile later.",
    fields: ["perks", "about", "pitch"],
  },
];

export function ProfileForm({ onExit }: { onExit?: () => void }) {
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
    fields: perksFields,
    append: perksAppend,
    remove: perksRemove,
  } = useFieldArray<EmployerProfileSchemaType, "perks">({
    control: control,
    name: "perks",
  });

  async function onSubmit(values: EmployerProfileSchemaType) {
    const response = await createEmployerAction(values);

    if (!response.success) {
      toast({
        variant: "destructive",
        title: "We couldn't create your company profile",
        description: "Something went wrong on our end. Please try again.",
      });
      return;
    }

    router.push("/employer/profile");
    toast({ title: "Your company profile is ready" });
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
          {step.id === "company" && (
            <WizardPanel id={step.id} title={step.title} hint={step.hint}>
              <TextInputField
                control={control}
                name="companyName"
                label="Company name"
                placeholder="e.g. Meta Platforms, Inc."
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <SelectField
                  control={control}
                  name="industry"
                  label="Industry"
                  options={INDUSTRY_TYPES}
                />
                <TextInputField
                  control={control}
                  name="location"
                  label="Location"
                  placeholder="e.g. Makati, Metro Manila"
                />
              </div>
              <FileUploadField
                control={control}
                name="companyLogo"
                label="Company logo"
              />
            </WizardPanel>
          )}

          {step.id === "contact" && (
            <WizardPanel id={step.id} title={step.title} hint={step.hint}>
              <TextInputField
                control={control}
                type="email"
                name="companyEmail"
                label="Company email"
                placeholder="careers@company.com"
              />
              <TextInputField
                control={control}
                type="url"
                name="companyWebsite"
                label="Company website"
                placeholder="https://company.com"
              />
            </WizardPanel>
          )}

          {step.id === "culture" && (
            <WizardPanel id={step.id} title={step.title} hint={step.hint}>
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
