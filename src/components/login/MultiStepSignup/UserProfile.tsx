import { FormEvent, useState } from "react";

import { Loading } from "@components/shared/Loading";
import { LockClosedIcon } from "@heroicons/react/24/outline";

import { useAuthContext } from "@context/auth";
import { errors } from "@utils/errorHandler";
import { addErrorNotification } from "@components/shared/alert";
import { LoginTypes } from "@constants/login/LoginTypes";

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
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label htmlFor="name" className="sr-only">
            name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="current-password"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Name"
            value={signUpData.name}
            onChange={({ target }) =>
              setSignUpData({ ...signUpData, name: target.value })
            }
          />
        </div>

        <div>
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Email address"
            value={signUpData.email}
            onChange={({ target }) =>
              setSignUpData({ ...signUpData, email: target.value })
            }
          />
        </div>

        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Password"
            value={signUpData.password}
            onChange={({ target }) =>
              setSignUpData({ ...signUpData, password: target.value })
            }
          />
        </div>
      </div>
    </div>
  );
};
