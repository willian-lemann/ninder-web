import { useState } from "react";

import { SignInForm } from "../components/login/SignInForm";
import { SignUpForm } from "../components/login/SignupForm";
import { withSSRGuest } from "../utils/withSSRGuest";

export default function Login() {
  const [loginType, setLoginType] = useState<"signin" | "signup">("signin");

  return (
    <div className="h-screen flex flex-col md:flex-row justify-between ">
      <section className="max-w-md w-full flex flex-col justify-center m-auto">
        <div>
          <div className="mx-auto font-bold w-auto text-center text-4xl">
            <span className="text-primary">Welcome to</span> Ninder
          </div>

          {loginType === "signin" ? (
            <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
          ) : (
            <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
              Sign up to your account
            </h2>
          )}
        </div>

        {loginType === "signin" ? (
          <SignInForm onLoginType={setLoginType} />
        ) : (
          <SignUpForm onLoginType={setLoginType} />
        )}
      </section>

      <section className="hidden md:block w-[50%] h-screen">
        <img
          src="/assets/image/login-background.jpg"
          alt="background image"
          className="w-full h-full object-cover"
        />
      </section>
    </div>
  );
}

export const getServerSideProps = withSSRGuest(async (context) => {
  return {
    props: {},
  };
});
