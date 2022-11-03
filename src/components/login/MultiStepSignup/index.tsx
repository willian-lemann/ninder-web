/* eslint-disable react/jsx-key */
import { FormEvent, useState } from "react";
import * as yup from "yup";
import { useMultistepForm } from "src/hooks/useMultistepForm";
import { ActionButton } from "./ActionButton";

import { ArrowLeftIcon } from "@heroicons/react/24/outline";

import { UserProfile } from "./UserProfile";
import { UserInformation } from "./UserInformation";
import { classNames } from "@utils/classNames";

import { useAuthContext } from "@context/auth";
import { RegisterForm } from "@dtos/login/RegisterForm";
import {
  userInformationSchema,
  userProfileSchema,
} from "@validators/login/schemas";

import { errors, Errors, ErrorType } from "src/validators/login/errors";

interface MultiStepSignupProps {
  onLoginType: (type: "signin" | "signup") => void;
}

export const MultiStepSignup = ({ onLoginType }: MultiStepSignupProps) => {
  const { signUp } = useAuthContext();
  const [formErrors, setFormErrors] = useState<Errors>(errors);

  const [formData, setFormData] = useState<RegisterForm>({
    email: "",
    name: "",
    avatar: null,
    bio: "",
    birthday: new Date(),
    gender: 0,
    hometown: "",
    nationality: "",
    occupation: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleUpdateFields = (fields: Partial<RegisterForm | null>) => {
    setFormData((state) => ({ ...state, ...fields }));
  };

  const { next, back, step, currentStepIndex, isLastStep, isFirstStep } =
    useMultistepForm([
      <UserInformation
        {...formData}
        errors={formErrors}
        onUpdateFields={handleUpdateFields}
      />,
      <UserProfile
        {...formData}
        errors={formErrors}
        onUpdateFields={handleUpdateFields}
      />,
    ]);

  const [isSubmiting, setIsSubmiting] = useState(false);

  const handleBacktoSignin = () => {
    onLoginType("signin");
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setFormErrors(errors);

    try {
      if (!isLastStep) {
        await userInformationSchema.validate(formData, {
          abortEarly: false,
        });

        return next();
      }

      setIsSubmiting(true);

      await userProfileSchema.validate(formData, { abortEarly: false });

      await signUp({ ...formData });
    } catch (err: any) {
      if (err instanceof yup.ValidationError) {
        const errors: ErrorType = {};

        err.inner.forEach((error) => {
          errors[String(error.path)] = error.message;
        });

        console.log(errors);

        setFormErrors((state) => ({ ...state, ...errors }));
      }
    } finally {
      setIsSubmiting(false);
    }
  };

  const renderHeaderLabel = (stepIndex: number) => {
    type LabelIndex = {
      [key: number]: string;
    };

    const labelBasedOnIndex: LabelIndex = {
      0: "User Information",
      1: "Fill your profile",
    };

    return labelBasedOnIndex[stepIndex] || "";
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="h-full w-full max-w-md m-auto flex flex-col justify-between"
    >
      <div className="flex items-center mt-10">
        <div
          className="flex items-center group cursor-pointer"
          onClick={handleBacktoSignin}
        >
          <ArrowLeftIcon className="h-6 w-6 group-hover:text-primary transition-colors duration-300" />
          <span className="pl-2 group-hover:text-primary transition-colors duration-300">
            Sign in
          </span>
        </div>

        <span className="text-primary mx-auto font-bold w-auto text-center text-4xl">
          {renderHeaderLabel(currentStepIndex)}
        </span>
      </div>

      <main>{step}</main>

      <div
        className={classNames(
          isFirstStep ? "justify-end" : "justify-between",
          "flex items-center my-4 w-full gap-2"
        )}
      >
        {!isFirstStep && (
          <ActionButton label="Back" type="button" onClick={back} />
        )}
        <ActionButton
          label={isLastStep ? "Submit" : "Next"}
          type="submit"
          loading={isSubmiting}
        />
      </div>
    </form>
  );
};
