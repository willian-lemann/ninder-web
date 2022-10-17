import { useState } from "react";

import { InformationCircleIcon } from "@heroicons/react/24/outline";

import { Input } from "./Input";
import { DatePicker } from "./DatePicker";
import { FEMALE, MALE, OTHER } from "@constants/gender";
import { SignUpCredencials } from "@dtos/login/SignUpCredencials";

interface UserProfileData
  extends Pick<
    SignUpCredencials,
    | "nationality"
    | "phone"
    | "birthday"
    | "gender"
    | "password"
    | "confirmPassword"
  > {}

interface UserProfileProps extends UserProfileData {
  onUpdateFields: (fields: Partial<UserProfileData>) => void;
}

export const UserProfile = ({
  nationality,
  phone,
  birthday,
  gender,
  password,
  confirmPassword,
  onUpdateFields,
}: UserProfileProps) => {
  return (
    <div className="mt-8 space-y-6">
      <input type="hidden" name="remember" defaultValue="true" />
      <div className="rounded-md shadow-sm -space-y-px gap-4 flex flex-col">
        <div>
          <label htmlFor="nationality" className="text-sm text-zinc-500">
            Nationality
          </label>
          <Input
            id="nationality"
            name="nationality"
            type="text"
            placeholder="ex: Brazilian, American, European..."
            value={nationality}
            onChange={({ target }) =>
              onUpdateFields({ nationality: target.value })
            }
          />
        </div>

        <div>
          <label htmlFor="phone" className="text-sm text-zinc-500">
            Phone
          </label>
          <Input
            id="phone"
            name="phone"
            type="number"
            placeholder="Phone (optional)"
            value={phone}
            onChange={({ target }) => onUpdateFields({ phone: target.value })}
          />
        </div>

        <DatePicker
          value={birthday}
          onChangeDate={(newDate) => onUpdateFields({ birthday: newDate })}
        />

        <div>
          <label
            htmlFor="gender"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Gender
          </label>
          <select
            id="gender"
            className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={Number(gender)}
            onChange={({ target }) =>
              onUpdateFields({ gender: Number(target.value) })
            }
          >
            <option selected>Select your gender</option>
            <option value={MALE}>Male</option>
            <option value={FEMALE}>Female</option>
            <option value={OTHER}>Other</option>
          </select>
        </div>

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
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="password"
            value={password}
            onChange={({ target }) =>
              onUpdateFields({ password: target.value })
            }
          />
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="flex items-center mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            <span>Confirm Password</span>
          </label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="confirm password"
            value={confirmPassword}
            onChange={({ target }) =>
              onUpdateFields({ confirmPassword: target.value })
            }
          />
        </div>
      </div>
    </div>
  );
};
