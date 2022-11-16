import { useState } from "react";
import Image from "next/image";

import { SignInForm } from "@components/login/SignInForm";
import { MultiStepSignup } from "../components/login/MultiStepSignup";
import { withSSRGuest } from "../utils/withSSRGuest";
import { LoginTypes } from "@constants/login/LoginTypes";

export default function Login() {
  const [loginType, setLoginType] = useState<LoginTypes>("signin");

  const handleChangeLoginType = (type: LoginTypes) => {
    setLoginType(type);
  };

  return (
    <div className="h-screen flex flex-col md:flex-row justify-between ">
      {/* <section className="flex-1">
        {loginType === "signin" ? (
          <SignInForm onLoginType={handleChangeLoginType} />
        ) : (
          <MultiStepSignup onLoginType={handleChangeLoginType} />
        )}
      </section>

      <section className="hidden md:block w-[50%] h-screen relative">
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/ninder-dev.appspot.com/o/images%2Flogin-background.png?alt=media&token=f9e85180-2e56-4181-a5b1-cca409f664d2"
          alt="background image"
          className="h-full w-full object-cover"
          fill
          loading="lazy"
        />
      </section> */}
      <main className="flex items-center justify-center h-screen w-screen bg-zinc-900">
        <div className="text-center flex gap-4 flex-col">
          <h1 className="text-white"> Coming soon...</h1>
          <p className="text-white">
            A platform where you can find native speakers to practice your
            english, to share cultures and have fun.
          </p>
        </div>
      </main>
    </div>
  );
}

export const getServerSideProps = withSSRGuest(async (context) => {
  return {
    props: {},
  };
});
