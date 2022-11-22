import { ChangeEvent, useCallback, useState } from "react";
import Image from "next/image";
import { Input } from "../Input";
import { classNames } from "@utils/classNames";
import { PreviewImage } from "./PreviewImage";
import { UserInformationForm } from "@dtos/login/UserInformationForm";
import { Errors } from "@validators/login/errors";
import { Textarea } from "../Textarea";
import { useCountries } from "@hooks/useCountries";
import { Select } from "./Select";
import useSWR from "swr";

interface UserInformationProps extends UserInformationForm {
  errors: Errors;
  onUpdateFields: (fields: Partial<UserInformationForm>) => void;
}

export const UserInformation = ({
  email,
  name,
  bio,
  hometown,
  occupation,
  onUpdateFields,
  errors,
}: UserInformationProps) => {
  const { countries, isLoading } = useCountries();

  const [preview, setPreview] = useState("");

  const handleChangeImage = useCallback(
    (event: ChangeEvent<HTMLInputElement> | null) => {
      console.log(!!event);
      if (!event) {
        return document.getElementById("profile-image")?.click();
      }

      event.preventDefault();
      event.stopPropagation();

      const { files } = event.target;
      const file = files?.item(0) as File;

      if (!file) return;

      const previewImage = URL.createObjectURL(file);
      setPreview(previewImage);

      onUpdateFields({ avatar: file });
    },
    [onUpdateFields]
  );

  return (
    <div className="space-y-4">
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
            <PreviewImage preview={preview} onChangeImage={handleChangeImage} />
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
          value={name}
          onChange={({ target }) => onUpdateFields({ name: target.value })}
        />

        <Input
          label="Email"
          id="email-address"
          name="email"
          type="email"
          autoComplete="email"
          error={errors.email}
          placeholder="ex: john-doe@gmail.com"
          value={email}
          onChange={({ target }) => onUpdateFields({ email: target.value })}
        />

        <Select
          label="Hometown"
          id="hometown"
          name="hometown"
          options={countries}
          loading={isLoading}
          error={errors.hometown}
          placeholder="City, state or country you are from..."
          value={hometown}
          onChange={({ target }) => onUpdateFields({ hometown: target.value })}
        />

        <Input
          label="Occupation"
          id="occupation"
          name="occupation"
          type="text"
          placeholder="What you do for a living?"
          error={errors.occupation}
          value={occupation}
          onChange={({ target }) =>
            onUpdateFields({ occupation: target.value })
          }
        />

        <Textarea
          label="Bio"
          name="bio"
          id="bio"
          error={errors.bio}
          placeholder="Tell a little bit more about your self, so others will know you more..."
          className={classNames(
            errors.bio ? "border-red-600 placeholder:text-red-600" : "",
            "rounded-md appearance-none resize-y h-20 relative block w-full px-3 py-2 rounded-b-md border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
          )}
          value={bio}
          onChange={({ target }) => onUpdateFields({ bio: target.value })}
        />
      </div>
    </div>
  );
};
