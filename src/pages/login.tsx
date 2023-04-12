import { useState } from "react";
import Image from "next/image";

import { SignIn, SignUp } from "@clerk/nextjs";

import { LoginTypes } from "@/constants/login/LoginTypes";
import { useRouter } from "next/router";

export default function Login() {
  const [formType, setFormType] = useState("signin");

  return (
    <div className="h-screen flex flex-col md:flex-row justify-between ">
      <section className="flex-1 flex items-center justify-center flex-col">
        <button
          onClick={() =>
            setFormType((state) => (state === "signup" ? "signin" : "signup"))
          }
        >
          {formType === "signin" ? "Signin" : "Signup"}
        </button>

        {formType === "signin" ? (
          <SignIn
            appearance={{
              layout: { logoPlacement: "inside" },
              variables: {
                colorPrimary: "#6A3093",
                fontFamily: "Roboto",
              },
              elements: {
                footerAction__signIn: { display: "none" },
              },
            }}
          />
        ) : (
          <SignUp
            appearance={{
              layout: { logoPlacement: "inside" },
              variables: {
                colorPrimary: "#6A3093",
                fontFamily: "Roboto",
              },
              elements: {},
            }}
          />
        )}
      </section>

      <section className="hidden md:block w-[50%] h-screen relative">
        <Image
          src="/images/background-login.png"
          alt="background image"
          className="h-full w-full object-cover"
          fill
          loading="lazy"
        />
      </section>
    </div>
  );
}
