import { useState } from "react";

import { InformationCircleIcon } from "@heroicons/react/24/outline";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

import { Input } from "../Input";
import { DatePicker } from "./DatePicker";
import { FEMALE, MALE, OTHER } from "@constants/login/gender";
import { UserProfileForm } from "@dtos/login/UserProfileForm";
import { Errors } from "@validators/login/errors";
import { Select } from "./Select";
interface UserProfileProps extends UserProfileForm {
  errors: Errors;
  onUpdateFields: (fields: Partial<UserProfileForm>) => void;
}

export const UserProfile = ({
  nationality,
  phone,
  birthday,
  gender,
  password,
  confirmPassword,
  onUpdateFields,
  errors,
}: UserProfileProps) => {
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

  return (
    <div className="mt-8 space-y-6">
      <input type="hidden" name="remember" defaultValue="true" />

      <div className="rounded-md shadow-sm -space-y-px gap-4 flex flex-col">
        <Input
          label="Nationality"
          id="nationality"
          name="nationality"
          type="text"
          error={errors.nationality}
          placeholder="ex: Brazilian, American, European..."
          value={nationality}
          onChange={({ target }) =>
            onUpdateFields({ nationality: target.value })
          }
        />

        <Input
          label="Phone (optional)"
          id="phone"
          name="phone"
          type="number"
          placeholder="Phone"
          error={errors.phone}
          value={phone}
          onChange={({ target }) => onUpdateFields({ phone: target.value })}
        />

        <DatePicker
          error={errors.birthday}
          value={birthday}
          onChangeDate={(newDate) => onUpdateFields({ birthday: newDate })}
        />

        <Select
          label="Gender"
          id="gender"
          error={errors.gender}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          value={Number(gender)}
          options={[
            { label: "Male", value: MALE },
            { label: "Female", value: FEMALE },
            { label: "Other", value: OTHER },
          ]}
          onChange={({ target }) => {
            onUpdateFields({ gender: Number(target.value) });
          }}
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
              value={password}
              onChange={({ target }) =>
                onUpdateFields({ password: target.value })
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
            value={confirmPassword}
            error={errors.confirmPassword}
            onChange={({ target }) =>
              onUpdateFields({ confirmPassword: target.value })
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
      </div>
    </div>
  );
};
