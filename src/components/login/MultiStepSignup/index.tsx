/* eslint-disable react/jsx-key */
import { FormEvent, useState } from "react";
import { useMultistepForm } from "src/hooks/useMultistepForm";
import { ActionButton } from "./ActionButton";

import { UserProfile } from "./UserProfile";
import { UserInformation } from "./UserInformation";

interface MultiStepSignupProps {
  onLoginType: (type: "signin" | "signup") => void;
}

export const MultiStepSignup = ({ onLoginType }: MultiStepSignupProps) => {
  const { next, back, step } = useMultistepForm([
    <UserInformation />,
    <UserProfile onLoginType={onLoginType} />,
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
      <div className="mx-auto font-bold w-auto text-center text-4xl mt-10">
        <span className="text-primary">Create your profile</span>
      </div>

      <main>{step}</main>

      <div className="flex items-center mb-20 w-full justify-end gap-2">
        <ActionButton label="Back" type="button" onClick={back} />
        <ActionButton label="Next" type="submit" />
      </div>
    </form>
  );
};
