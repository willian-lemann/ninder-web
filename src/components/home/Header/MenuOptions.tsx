import { Fragment } from "react";
import Router from "next/router";
import { useAuthContext } from "@context/auth";
import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import { classNames } from "@utils/classNames";

import { FavoritesPopover } from "./FavoritesPopover";
import { useChatsContext } from "@context/chat";

export const MenuOptions = () => {
  const { user, signOut } = useAuthContext();
  const { chats, numberOfUnReadChats } = useChatsContext();

  function handleNavigate(path: string) {
    Router.push(path);
  }

  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <span className="sr-only">Open user menu</span>

          <div className="h-8 w-8">
            {user?.avatar ? (
              <Image
                className="object-cover rounded-full"
                src={user?.avatar as string}
                alt="avatar image"
                fill
                loading="lazy"
              />
            ) : null}
          </div>
        </Menu.Button>
      </div>
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
                  <span className="absolute -right-4 -top-1 bg-primary rounded-full w-4 h-4 text-white text-xs flex items-center justify-center">
                    {numberOfUnReadChats}
                  </span>
                </span>
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
                <span className="relative">
                  Notifications
                  <span className="absolute -right-3 -top-1 bg-primary rounded-full w-3 h-3 text-sm text-white flex items-center justify-center"></span>
                </span>
              </button>
            )}
          </Menu.Item>

          <Menu.Item>
            <FavoritesPopover
              numberOfFavorites={Number(user?.favorites?.length)}
            />
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
                onClick={signOut}
                className={classNames(
                  active ? "bg-gray-100" : "",
                  "block px-4 py-2 text-sm text-gray-700 text-left w-full"
                )}
              >
                Sign out
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
