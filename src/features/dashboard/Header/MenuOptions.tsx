import { Fragment } from "react";
import Router from "next/router";
import { useAuth } from "@/features/authentication/hooks/use-auth";
import { SignOutButton } from "@clerk/nextjs";
import { Menu, Transition } from "@headlessui/react";

import { classNames } from "@/utils/classNames";

import { FavoritesPopover } from "./FavoritesPopover";

import { Avatar } from "./Avatar";
import { NotificationsPopover } from "./NotificationsPopover";

export const MenuOptions = () => {
  const { currentUser, signOut } = useAuth();

  const numberOfUnReadChats = 0;

  function handleNavigate(path: string) {
    Router.push(path);
  }

  return (
    <Menu as="div" className="relative ml-3 ">
      <Menu.Button className="flex items-center relative">
        <Avatar avatar={currentUser?.profileImageUrl as string} />

        <span
          className={classNames(
            numberOfUnReadChats > 0 ? "block" : "hidden",
            "absolute right-0 top-1 text-white w-4 h-4 flex items-center justify-center bg-primary rounded-full text-xs"
          )}
        >
          {numberOfUnReadChats}
        </span>
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-[500] mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={() => handleNavigate("/chats")}
                className={classNames(
                  active ? "bg-gray-100" : "",
                  "block px-4 py-2 text-sm text-gray-700 text-left w-full"
                )}
              >
                <span className="relative">
                  Messages
                  {numberOfUnReadChats > 0 ? (
                    <span className="absolute -right-4 -top-1 bg-primary rounded-full w-4 h-4 text-white text-xs flex items-center justify-center">
                      {numberOfUnReadChats}
                    </span>
                  ) : null}
                </span>
              </button>
            )}
          </Menu.Item>

          <Menu.Item>
            <NotificationsPopover />
          </Menu.Item>

          <Menu.Item>
            <FavoritesPopover />
          </Menu.Item>

          <Menu.Item>
            {({ active }) => (
              <button
                className={classNames(
                  active ? "bg-gray-100" : "",
                  "block px-4 py-2 text-sm text-gray-700 text-left w-full"
                )}
              >
                Explore
              </button>
            )}
          </Menu.Item>

          <Menu.Item>
            {({ active }) => (
              <button
                onClick={() => handleNavigate("/account")}
                className={classNames(
                  active ? "bg-gray-100" : "",
                  "block px-4 py-2 text-sm text-gray-700 text-left w-full"
                )}
              >
                Account
              </button>
            )}
          </Menu.Item>

          <Menu.Item>
            {({ active }) => (
              <button
                className={classNames(
                  active ? "bg-gray-100" : "",
                  "block px-4 py-2 text-sm text-gray-700 text-left w-full"
                )}
              >
                Help
              </button>
            )}
          </Menu.Item>

          <Menu.Item>
            {({ active }) => (
              <button
                className={classNames(
                  active ? "bg-gray-100" : "",
                  "block px-4 py-2 text-sm text-gray-700 text-left w-full"
                )}
              >
                <SignOutButton />
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};