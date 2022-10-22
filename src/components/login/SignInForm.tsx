import { FormEvent, useState } from "react";

import { addErrorNotification } from "@components/shared/alert";
import { GoogleLogin } from "../GoogleLogin";
import { LockClosedIcon } from "@heroicons/react/24/outline";

import { Loading } from "@components/shared/Loading";

import { useAuthContext } from "@context/auth";
import { errors } from "@utils/errorHandler";
import { FirebaseError } from "firebase/app";
import { Input } from "./Input";

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
    <div className="m-auto h-full max-w-md">
      <header className="flex items-center justify-between mt-16">
        <section>
          <h1 className="text-4xl">Ninder Logo</h1>
        </section>

        <section>
          <span>
            Don't have an account?{" "}
            <span className="underline cursor-pointer text-primary">
              Sign Up
            </span>
          </span>
        </section>
      </header>

      <form className="space-y-6 mt-16" onSubmit={handleSignIn}>
        <div>
          <strong className="text-3xl">Get Started!</strong>
          <p className="m-0 text-lg">
            Find native spearkers right where you are. Practice, Have fun!
          </p>
        </div>

        <input type="hidden" name="remember" defaultValue="true" />
        <div className="rounded-md shadow-sm flex flex-col gap-4">
          <div>
            <label htmlFor="email-address" className="">
              Email
            </label>
            <Input
              id="email-address"
              name="email"
              type="text"
              autoComplete="email"
              required
              placeholder="Email"
              value={signInData.email}
              onChange={({ target }) =>
                setSignInData({ ...signInData, email: target.value })
              }
            />
          </div>

          <div>
            <label htmlFor="password" className="">
              Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="Password"
              value={signInData.password}
              onChange={({ target }) =>
                setSignInData({ ...signInData, password: target.value })
              }
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm">
            <a href="#" className="font-medium text-primary">
              Forgot your password?
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-10">
          <button
            type="submit"
            className="group outline-none relative w-full py-3 flex justify-center items-center border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:brightness-90 transition-all duration-300"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <LockClosedIcon
                className="h-5 w-5 text-white"
                aria-hidden="true"
              />
            </span>
            {loading ? <Loading size={6} /> : "Sign in"}
          </button>

          <div className="flex items-center">
            <span className="flex-1 h-[1px] bg-zinc-200" />
            <span className="mx-4">or</span>
            <span className="flex-1 h-[1px] bg-zinc-200" />
          </div>

          <GoogleLogin label="Continue with Google" />
        </div>
      </form>
    </div>
  );
};
