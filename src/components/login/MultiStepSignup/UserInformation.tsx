import { ChangeEvent, useState } from "react";
import Image from "next/image";

import { Input } from "./Input";
import { classNames } from "@utils/classNames";
import { PreviewImage } from "./PreviewImage";

export const UserInformation = () => {
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
  }

  return (
    <div className="space-y-6 mx-[1rem]">
      <input type="hidden" name="remember" defaultValue="true" />

      <div className="rounded-md shadow-sm -space-y-px gap-4 flex flex-col">
        <div
          className={classNames(
            !preview ? "border-2" : "",
            "rounded-full w-32 h-32 m-auto"
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
              "text-base text-zinc-400 h-full w-full rounded-full flex items-center justify-center cursor-pointer"
            )}
          >
            Select a photo
          </label>

          {preview && (
            <PreviewImage preview={preview} onChangeImage={handleChangeImage} />
          )}
        </div>

        <Input
          id="name"
          name="name"
          type="text"
          autoComplete="current-password"
          required
          placeholder="Name"
        />

        <Input
          id="email-address"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="Email address"
        />

        <textarea
          name="bio"
          id="bio"
          placeholder="Tell a little bit more about your self, so others will know you more..."
          className="rounded-md appearance-none resize-y h-32 relative block w-full px-3 py-2 rounded-b-md border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
        />
      </div>
    </div>
  );
};
