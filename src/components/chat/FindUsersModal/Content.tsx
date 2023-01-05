import { useState } from "react";

import { CheckCircleIcon as SolidCheckIcon } from "@heroicons/react/24/solid";
import { CheckCircleIcon as OutlineCheckIcon } from "@heroicons/react/24/outline";
import { RadioGroup } from "@headlessui/react";

import { useGeoLocation } from "@hooks/useGeoLocation";
import { useUsers } from "@context/users";
import { Avatar } from "../Avatar";
import { Loading } from "@components/shared/Loading";
import { SelectedUser, ContentType } from "./types";

interface ContentProps {
  contentType: ContentType;
  selectedUser: SelectedUser | null;
  onChangeSelectedUser(selectedUser: SelectedUser): void;
  onChangeMessageText(message: string): void;
}

export const Content = ({
  contentType,
  selectedUser,
  onChangeSelectedUser,
  onChangeMessageText,
}: ContentProps) => {
  const { users, isLoading } = useUsers();

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center mt-4 gap-4">
        <Loading />
        <span className="text-title-opacity">Finding new users...</span>
      </div>
    );
  }

  if (contentType === "Next") {
    return (
      <div className="mt-4 w-full overflow-auto flex justify-center h-full max-h-64 animate-fadeIn">
        <textarea
          placeholder="Send message..."
          className="w-full mx-6 pl-2 py-2 outline-none resize-y border rounded-md"
          rows={4}
          onChange={({ target }) => onChangeMessageText(target.value)}
        />
      </div>
    );
  }

  return (
    <RadioGroup
      className="mt-4 w-full overflow-auto h-full max-h-64"
      value={selectedUser}
      onChange={onChangeSelectedUser}
    >
      {users?.map((user) => (
        <RadioGroup.Option
          key={user.id}
          value={user}
          className="last:mb-0 mb-3"
        >
          {({ checked }) => (
            <li className="flex items-center justify-between cursor-pointer hover:bg-zinc-200 px-6 py-2 transition-colors duration-300">
              <div className="flex items-center">
                <Avatar image={user.avatar as string} />

                <div className="leading-5 pl-2">
                  <strong>{user.name}</strong>
                  <p>{user.nationality}</p>
                </div>
              </div>

              <div>
                {checked ? (
                  <SolidCheckIcon className="h-8 w-8 text-primary animate-fadeIn" />
                ) : (
                  <OutlineCheckIcon className="h-8 w-8 text-title-opacity" />
                )}
              </div>
            </li>
          )}
        </RadioGroup.Option>
      ))}
    </RadioGroup>
  );
};
