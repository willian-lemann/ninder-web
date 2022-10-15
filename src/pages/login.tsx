import { useState } from "react";

import { SignInForm } from "@components/login/SignInForm";
import { MultiStepSignup } from "../components/login/MultiStepSignup";
import { withSSRGuest } from "../utils/withSSRGuest";
import { LoginTypes } from "@constants/login/LoginTypes";

const Login = () => {
  const [loginType, setLoginType] = useState<LoginTypes>("signin");

  const handleChangeLoginType = (type: LoginTypes) => {
    setLoginType(type);
  };

  return (
    <div className="h-screen flex flex-col md:flex-row justify-between ">
      <section className="flex-1">
        {loginType === "signin" ? (
          <SignInForm onLoginType={handleChangeLoginType} />
        ) : (
          <MultiStepSignup onLoginType={handleChangeLoginType} />
        )}
      </section>

      <section className="hidden md:block w-[50%] h-screen">
        <img
          src="/images/login-background.png"
          alt="background image"
          className="h-full w-full object-cover"
        />
      </section>
    </div>
  );
};

export default Login;

export const getServerSideProps = withSSRGuest(async (context) => {
  return {
    props: {},
  };
});
