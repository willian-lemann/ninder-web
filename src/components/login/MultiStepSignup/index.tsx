/* eslint-disable react/jsx-key */
import { Loading } from "@components/shared/Loading";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import { FormEvent, useState } from "react";
import { useMultistepForm } from "src/hooks/useMultistepForm";
import { ActionButton } from "./ActionButton";

import { StepOne } from "./StepOne";
import { StepTwo } from "./StepTwo";

interface MultiStepSignupProps {
  onLoginType: (type: "signin" | "signup") => void;
}

export const MultiStepSignup = ({ onLoginType }: MultiStepSignupProps) => {
  const { next, back, step } = useMultistepForm([
    <StepOne onLoginType={onLoginType} />,
    <StepTwo />,
  ]);

  const [isSubmiting, setIsSubmiting] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    next();

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

  return (
    <form
      onSubmit={handleSubmit}
      className="h-full w-full max-w-md m-auto flex flex-col justify-between"
    >
      <div>
        <div className="mx-auto font-bold w-auto text-center text-4xl mt-2">
          <span className="text-primary">
            First we need to create your profile
          </span>
        </div>
      </div>

      <main>{step}</main>

      <div className="flex items-center mb-20 w-full justify-end gap-2">
        <ActionButton label="Back" onClick={back} />
        <ActionButton label="Next" type="submit" />
      </div>
    </form>
  );
};
