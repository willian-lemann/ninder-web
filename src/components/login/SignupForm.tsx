import { FormEvent, useState } from "react";

import { Loading } from "../shared/Loading";
import { LockClosedIcon } from "@heroicons/react/outline";

import { useAuth } from "../../context/AuthContext";

interface SignUpFormProps {
  onLoginType: (type: "signin" | "signup") => void;
}

export const SignUpForm = ({ onLoginType }: SignUpFormProps) => {
  const { signUp } = useAuth();
  const [loading, setLoading] = useState(false);

  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    name: "",
  });

  async function handleSignUp(event: FormEvent) {
    event.preventDefault();
    setLoading(true);

    try {
      await signUp(signUpData.email, signUpData.password, signUpData.name);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="mt-8 space-y-6 mx-[1rem]" onSubmit={handleSignUp}>
      <input type="hidden" name="remember" defaultValue="true" />
      <div className="rounded-md shadow-sm -space-y-px">
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
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Name"
            value={signUpData.name}
            onChange={({ target }) =>
              setSignUpData({ ...signUpData, name: target.value })
            }
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            type="button"
            className="ml-2 block text-sm text-gray-900 font-medium hover:text-indigo-500"
            onClick={() => onLoginType("signin")}
          >
            Sign In
          </button>
        </div>

        <div className="text-sm">
          <a
            href="#"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Forgot your password?
          </a>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="group outline-none relative w-full h-[38px] flex justify-center items-center border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:brightness-90 "
        >
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            <LockClosedIcon className="h-5 w-5 text-white" aria-hidden="true" />
          </span>
          {loading ? <Loading size={6} /> : "Sign up"}
        </button>
      </div>
    </form>
  );
};
