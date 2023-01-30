/* eslint-disable react/jsx-key */
import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import * as yup from "yup";

import {
  ArrowLeftIcon,
  EyeIcon,
  EyeSlashIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

import { classNames } from "@utils/classNames";

import { useAuthContext } from "@context/auth";
import { RegisterForm } from "@dtos/login/RegisterForm";
import { userInformationSchema } from "@validators/login/schemas";

import { errors, Errors, ErrorType } from "src/validators/login/errors";

import { exclude } from "@utils/exclude";

import { addErrorNotification } from "@components/shared/alert";
import { UPLOAD_LIMIT_IN_MB } from "@constants/login/userInformation";
import { Input } from "../Input";
import { PreviewImage } from "./PreviewImage";
import { SignUpCredencials } from "@dtos/login/SignUpCredencials";
import { Loading } from "@components/shared/Loading";

interface SignupFormProps {
  onLoginType: (type: "signin" | "signup") => void;
}

export const SignupForm = ({ onLoginType }: SignupFormProps) => {
  const { signUp } = useAuthContext();

  const [preview, setPreview] = useState("");
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [formErrors, setFormErrors] = useState<Errors>(errors);
  const [formData, setFormData] = useState<RegisterForm>({
    email: "",
    name: "",
    avatar: "",
    password: "",
    confirmPassword: "",
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const handleSeePassword = (key: "password" | "confirmPassword") => {
    if (key === "password") {
      setIsPasswordVisible(!isPasswordVisible);
    } else {
      setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
    }
  };

  const handleUpdateFields = (fields: Partial<RegisterForm | null>) => {
    setFormData((state) => ({ ...state, ...fields }));
  };

  const handleChangeImage = useCallback(
    (event: ChangeEvent<HTMLInputElement> | null) => {
      if (!event) {
        return document.getElementById("profile-image")?.click();
      }

      event.preventDefault();
      event.stopPropagation();

      const { files } = event.target;
      const file = files?.item(0) as File;

      if (!file) return;

      const imageSizeInMegaBytes = (file.size / 1024 / 1000).toFixed(2);

      if (Number(imageSizeInMegaBytes) > UPLOAD_LIMIT_IN_MB) {
        return addErrorNotification("Image must have a size less than 2mb");
      }

      const previewImage = URL.createObjectURL(file);
      setPreview(previewImage);

      handleUpdateFields({ avatar: previewImage });
    },
    []
  );

  const handleBacktoSignin = () => {
    onLoginType("signin");
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setFormErrors(errors);

    try {
      setIsSubmiting(true);

      await userInformationSchema.validate(formData, { abortEarly: false });

      exclude(formData, ["confirmPassword"]);

      const data: SignUpCredencials = {
        ...formData,
      };

      await signUp(data);
    } catch (err: any) {
      if (err instanceof yup.ValidationError) {
        const errors: ErrorType = {};

        err.inner.forEach((error) => {
          errors[String(error.path)] = error.message;
        });

        console.log(errors);

        setFormErrors((state) => ({ ...state, ...errors }));
      }
    } finally {
      setIsSubmiting(false);
    }
  };

  return (
    <div className="py-10 px-10">
      <div className="flex items-center px-10">
        <div
          className="flex items-center group cursor-pointer"
          onClick={handleBacktoSignin}
        >
          <ArrowLeftIcon className="h-6 w-6 group-hover:text-primary transition-colors duration-300" />
          <span className="pl-2 group-hover:text-primary transition-colors duration-300">
            Sign in
          </span>
        </div>

        <span className="text-primary mx-auto font-bold w-auto text-center text-4xl">
          User information
        </span>
      </div>

      <form
        onSubmit={handleSubmit}
        className="h-full w-full max-w-md m-auto flex flex-col justify-between mt-10"
      >
        <input type="hidden" name="remember" defaultValue="true" />

        <div className="rounded-md shadow-sm -space-y-px gap-4 flex flex-col">
          <div
            className={classNames(
              !preview ? "border-2" : "",
              "rounded-full w-32 h-32 m-auto border-dashed"
            )}
          >
            <Input
              id="profile-image"
              name="profile-image"
              type="file"
              className="sr-only"
              onChange={handleChangeImage}
            />

            <label
              htmlFor="profile-image"
              className={classNames(
                !preview ? "visible" : "hidden",
                "text-sm text-zinc-400 h-full w-full rounded-full flex items-center justify-center cursor-pointer"
              )}
            >
              Select a photo
            </label>

            {preview && (
              <PreviewImage
                preview={preview}
                onChangeImage={handleChangeImage}
              />
            )}
          </div>

          <Input
            label="Name"
            id="name"
            name="name"
            type="text"
            autoComplete="current-password"
            placeholder="Name"
            error={errors.name}
            value={formData.name}
            onChange={({ target }) =>
              handleUpdateFields({ name: target.value })
            }
          />

          <Input
            label="Email"
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            error={errors.email}
            placeholder="ex: john-doe@gmail.com"
            value={formData.email}
            onChange={({ target }) =>
              handleUpdateFields({ email: target.value })
            }
          />

          <div>
            <label
              htmlFor="password"
              className="flex items-center mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              <span>Password</span>
              <div className="group relative flex items-center">
                <InformationCircleIcon className="h-6 w-6" />

                <div className="group-hover:opacity-100 group-hover:visible z-[900] absolute left-6 top-2 w-64 invisible py-2 px-3 text-sm font-medium text-white bg-zinc-400 rounded-lg border border-gray-200 shadow-sm opacity-0 transition-all duration-300">
                  Password must contain uppercase, lowercase letters, one number
                  and one symbol
                </div>
              </div>

              <span
                className={
                  errors.password
                    ? "not-sr-only text-red-600 pl-2 text-sm"
                    : "sr-only "
                }
              >
                {errors.password}
              </span>
            </label>

            <div className="rounded-lg relative bg-black">
              <Input
                id="password"
                name="password"
                type={isPasswordVisible ? "text" : "password"}
                error={errors.password}
                autoComplete="text"
                placeholder="password"
                value={formData.password}
                onChange={({ target }) =>
                  handleUpdateFields({ password: target.value })
                }
              />

              {isPasswordVisible ? (
                <EyeIcon
                  onClick={() => handleSeePassword("password")}
                  className="h-6 w-6 absolute right-4 z-20 top-1/4 cursor-pointer"
                />
              ) : (
                <EyeSlashIcon
                  onClick={() => handleSeePassword("password")}
                  className="h-6 w-6 absolute right-4 z-20 top-1/4 cursor-pointer"
                />
              )}
            </div>
          </div>

          <div className="rounded-lg relative">
            <Input
              label="Confirm Password"
              id="confirmPassword"
              name="confirmPassword"
              type={isConfirmPasswordVisible ? "text" : "password"}
              placeholder="confirm password"
              value={formData.confirmPassword}
              error={errors.confirmPassword}
              onChange={({ target }) =>
                handleUpdateFields({ confirmPassword: target.value })
              }
            />

            {isConfirmPasswordVisible ? (
              <EyeIcon
                onClick={() => handleSeePassword("confirmPassword")}
                className="h-6 w-6 absolute right-4 z-20 top-1/2 cursor-pointer"
              />
            ) : (
              <EyeSlashIcon
                onClick={() => handleSeePassword("confirmPassword")}
                className="h-6 w-6 absolute right-4 z-20 top-1/2 cursor-pointer"
              />
            )}
          </div>

          <button
            type="submit"
            className="border-none w-auto h-[35px] bg-primary text-white hover:brightness-90 transition-all duration-300 rounded-md px-4"
          >
            {isSubmiting ? <Loading /> : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};
