/* eslint-disable react/no-unescaped-entities */
import { FormEvent, useState } from "react";

import { addErrorNotification } from "@components/shared/alert";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import { Loading } from "@components/shared/Loading";
import { Input } from "./Input";
import Image from "next/image";

import { useAuthContext } from "@context/auth";
import { errors } from "@utils/errorHandler";
import { FirebaseError } from "firebase/app";
import { preload } from "swr";
import { api } from "@config/axios";

interface SignInFormProps {
  onLoginType: (type: "signin" | "signup") => void;
}

const fetcher = () => api.get("/countries").then((response) => response.data);

preload("/api/data", fetcher);

export const SignInForm = ({ onLoginType }: SignInFormProps) => {
  const { signIn, signInWithGoogle } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [isSigningWithGoogle, setIsSigningWithGoogle] = useState(false);

  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  const handleSignInWithGoogle = async () => {
    setIsSigningWithGoogle(true);

    await signInWithGoogle();

    setIsSigningWithGoogle(false);
  };

  const handleSignIn = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const { email, password } = signInData;

    try {
      await signIn({ email, password });
    } catch (error: any) {
      console.log(error);
      if (error instanceof FirebaseError) {
        return addErrorNotification(
          errors[error.code] || "Error trying to sign in. Try again!"
        );
      }

      addErrorNotification("Error trying to sign in. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="m-auto max-w-md">
      <header className="flex items-center justify-between mt-16">
        <div className="relative h-8 w-28">
          <Image src="/logo.svg" alt="logo" fill />
        </div>

        <div>
          <span>Don't have an account?</span>
          <span
            className=" cursor-pointer text-primary pl-1"
            onClick={() => onLoginType("signup")}
          >
            Sign Up
          </span>
        </div>
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

        <div className="flex flex-col gap-8">
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
            {loading ? <Loading size={5} /> : "Sign in"}
          </button>

          <div className="flex items-center">
            <span className="flex-1 h-[1px] bg-zinc-200" />
            <span className="mx-4">or</span>
            <span className="flex-1 h-[1px] bg-zinc-200" />
          </div>

          <button
            type="button"
            onClick={handleSignInWithGoogle}
            className="flex items-center justify-center shadow-md px-3 py-3 rounded-md border"
          >
            {isSigningWithGoogle ? (
              <Loading />
            ) : (
              <>
                <div className="h-6 w-6 relative">
                  <Image src="/icons/google.svg" alt="google icon" fill />
                </div>

                <span className="pl-4">Continue with Google</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
