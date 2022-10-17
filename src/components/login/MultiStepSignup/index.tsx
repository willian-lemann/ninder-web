/* eslint-disable react/jsx-key */
import { FormEvent, useState } from "react";
import { useMultistepForm } from "src/hooks/useMultistepForm";
import { ActionButton } from "./ActionButton";

import { ArrowLeftIcon } from "@heroicons/react/24/outline";

import { UserProfile } from "./UserProfile";
import { UserInformation } from "./UserInformation";
import { User } from "@models/user";
import { classNames } from "@utils/classNames";
import { SignUpCredencials } from "@dtos/login/SignUpCredencials";
import { useAuthContext } from "@context/auth";
import { addErrorNotification } from "@components/shared/alert";

interface MultiStepSignupProps {
  onLoginType: (type: "signin" | "signup") => void;
}

export const MultiStepSignup = ({ onLoginType }: MultiStepSignupProps) => {
  const { signUp } = useAuthContext();
  const [formData, setFormData] = useState<SignUpCredencials>({
    email: "",
    name: "",
    avatar: null,
    bio: "",
    birthday: new Date(),
    gender: null,
    hometown: "",
    nationality: "",
    occupation: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleUpdateFields = (fields: Partial<SignUpCredencials | null>) => {
    setFormData((state) => ({ ...state, ...fields }));
  };

  const { next, back, step, currentStepIndex, isLastStep, isFirstStep } =
    useMultistepForm([
      <UserInformation {...formData} onUpdateFields={handleUpdateFields} />,
      <UserProfile {...formData} onUpdateFields={handleUpdateFields} />,
    ]);

  const [isSubmiting, setIsSubmiting] = useState(false);

  const handleBacktoSignin = () => {
    onLoginType("signin");
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!isLastStep) return next();

    console.log(formData);

    try {
      await signUp({ ...formData });
    } catch (error) {
      addErrorNotification(error);
    }

    //  const { email, password, name } = signUpData;

    //  try {
    //    await signUp({ email, name, password });
    //  } catch (error) {
    //    addErrorNotification(
    //      errors[error.code] || "Error trying to sign up. Try again!"
    //    );
    //  } finally {
    //    setLoading(false);
    //  }
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
        <ActionButton label={isLastStep ? "Submit" : "Next"} type="submit" />
      </div>
    </form>
  );
};
