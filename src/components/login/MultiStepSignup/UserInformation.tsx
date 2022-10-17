import { ChangeEvent, useState } from "react";
import Image from "next/image";

import { Input } from "./Input";
import { classNames } from "@utils/classNames";
import { PreviewImage } from "./PreviewImage";

import { SignUpData } from ".";

interface UserInformationData
  extends Pick<
    SignUpData,
    "name" | "email" | "hometown" | "occupation" | "bio" | "avatar"
  > {}

interface UserInformationProps extends UserInformationData {
  onUpdateFields: (fields: Partial<UserInformationData>) => void;
}

export const UserInformation = ({
  email,
  name,
  bio,
  hometown,
  occupation,
  onUpdateFields,
}: UserInformationProps) => {
  const [preview, setPreview] = useState("");

  function handleChangeImage(event: ChangeEvent<HTMLInputElement> | null) {
    if (!event) {
      return document.getElementById("profile-image")?.click();
    }

    event.preventDefault();
    event.stopPropagation();

    const { files } = event.target;
    const file = files?.item(0) as File;
    const previewImage = URL.createObjectURL(file);
    setPreview(previewImage);

    onUpdateFields({ avatar: file });
  }

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

        <div>
          <label htmlFor="name" className="text-sm text-zinc-500">
            Name
          </label>

          <Input
            id="name"
            name="name"
            type="text"
            autoComplete="current-password"
            placeholder="Name"
            value={name}
            onChange={({ target }) => onUpdateFields({ name: target.value })}
          />
        </div>

        <div>
          <label htmlFor="email-address" className="text-sm text-zinc-500">
            Email
          </label>
          <Input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="ex: john-doe@gmail.com"
            value={email}
            onChange={({ target }) => onUpdateFields({ email: target.value })}
          />
        </div>

        <div>
          <label htmlFor="hometown" className="text-sm text-zinc-500">
            Hometown
          </label>
          <Input
            id="hometown"
            name="hometown"
            type="text"
            placeholder="City or state you are from..."
            value={hometown}
            onChange={({ target }) =>
              onUpdateFields({ hometown: target.value })
            }
          />
        </div>

        <div>
          <label htmlFor="occupation" className="text-sm text-zinc-500">
            Occupation
          </label>
          <Input
            id="occupation"
            name="occupation"
            type="text"
            placeholder="What you do for a living?"
            value={occupation}
            onChange={({ target }) =>
              onUpdateFields({ occupation: target.value })
            }
          />
        </div>

        <div>
          <label htmlFor="bio" className="text-sm text-zinc-500">
            Bio
          </label>
          <textarea
            name="bio"
            id="bio"
            placeholder="Tell a little bit more about your self, so others will know you more..."
            className="rounded-md appearance-none resize-y h-20 relative block w-full px-3 py-2 rounded-b-md border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
            value={bio}
            onChange={({ target }) => onUpdateFields({ bio: target.value })}
          />
        </div>
      </div>
    </div>
  );
};
