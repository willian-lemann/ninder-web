import { useState } from "react";

import { LoginTypes } from "@constants/login/LoginTypes";
import { Input } from "./Input";

interface SignUpFormProps {
  onLoginType: (type: LoginTypes) => void;
}

export const UserProfile = ({ onLoginType }: SignUpFormProps) => {
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    name: "",
  });

  return (
    <div className="mt-8 space-y-6 mx-[1rem]">
      <input type="hidden" name="remember" defaultValue="true" />
      <div className="rounded-md shadow-sm -space-y-px gap-4 flex flex-col">
        <Input
          id="nationality"
          name="nationality"
          type="text"
          placeholder="Where you from?"
        />

        <Input
          id="phone"
          name="phone"
          type="number"
          placeholder="Phone (optional)"
        />

        <Input
          id="birthday"
          name="birthday"
          type="text"
          placeholder="Birthday"
        />

        <Input id="gender" name="gender" type="text" placeholder="Gender" />

        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
        />
      </div>
    </div>
  );
};
