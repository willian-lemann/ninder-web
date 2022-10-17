import { FormEvent, useState } from "react";

import { addErrorNotification } from "@components/shared/alert";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import { Loading } from "@components/shared/Loading";

import { useAuthContext } from "@context/auth";
import { errors } from "@utils/errorHandler";
import { FirebaseError } from "firebase/app";

interface SignInFormProps {
  onLoginType: (type: "signin" | "signup") => void;
}

export const SignInForm = ({ onLoginType }: SignInFormProps) => {
  const { signIn } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });
  async function handleSignIn(event: FormEvent) {
    event.preventDefault();
    setLoading(true);

    const { email, password } = signInData;

    try {
      await signIn({ email, password });
    } catch (error: any) {
      if (error instanceof FirebaseError) {
        addErrorNotification(
          errors[error.code] || "Error trying to sign in. Try again!"
        );
      }

      addErrorNotification(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="m-auto h-full flex flex-col max-w-md justify-center">
      <form className=" space-y-6 mx-[1rem]" onSubmit={handleSignIn}>
        <div>
          <div className="mx-auto font-bold w-auto text-center text-4xl">
            <span className="text-primary">
              Discover new users, new cultures, new possibilities and have fun
            </span>
          </div>

          <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <input type="hidden" name="remember" defaultValue="true" />
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="text"
              autoComplete="email"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
              value={signInData.email}
              onChange={({ target }) =>
                setSignInData({ ...signInData, email: target.value })
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
              value={signInData.password}
              onChange={({ target }) =>
                setSignInData({ ...signInData, password: target.value })
              }
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              type="button"
              className="ml-2 block text-sm text-gray-900 font-medium hover:text-primary"
              onClick={() => onLoginType("signup")}
            >
              Sign Up
            </button>
          </div>

          <div className="text-sm">
            <a href="#" className="font-medium text-primary">
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
              <LockClosedIcon
                className="h-5 w-5 text-white"
                aria-hidden="true"
              />
            </span>
            {loading ? <Loading size={6} /> : "Sign in"}
          </button>
        </div>
      </form>
    </div>
  );
};
