import { Fragment, useState } from "react";
import { Disclosure, Menu, Popover, Transition } from "@headlessui/react";

import {
  MagnifyingGlassIcon as SearchIcon,
  BellIcon,
  XMarkIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";

import { classNames } from "../../utils/classNames";
import { MenuOptions } from "./MenuOptions";

const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
];

export const Header = () => {
  const [search, setSearch] = useState("");

  return (
    <Disclosure as="nav" className="bg-white">
      {({ open }) => (
        <>
          <div className=" px-2 sm:px-6 lg:px-8 lg:w-full">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex w-full items-center justify-center sm:items-center sm:justify-between">
                <div className="flex flex-shrink-0 items-center w-52">
                  <span className="text-2xl text-primary">Ninder</span>
                </div>

                <div className="hidden sm:block w-1/4">
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      id="default-search"
                      className="block p-3 pl-4 w-full shadow-sm hover:shadow-md transition-shadow duration-300 outline-none text-sm text-title-opacity  rounded-3xl border border-gray-300 "
                      placeholder="Search for a user..."
                      value={search}
                      onChange={({ target }) => setSearch(target.value)}
                      required
                    />

                    <button
                      type="submit"
                      className="text-white absolute right-0 rounded-full px-2 py-2 mr-2 flex items-center justify-center"
                    >
                      <SearchIcon
                        className={classNames(
                          search ? "hidden" : "sr-only",
                          "text-title-opacity  h-6 w-6 relative"
                        )}
                      />

                      <XMarkIcon
                        className={classNames(
                          search ? "block" : "hidden",
                          "text-title-opacity  h-6 w-6 relative"
                        )}
                      />
                    </button>
                  </div>
                </div>

                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <ul className="flex items-center gap-2 mr-3 ">
                    <li className=" text-base text-primary px-2 py-1 rounded-md cursor-pointer relative">
                      <span className="absolute -right-1 top-0 rounded-full w-4 h-4 bg-primary text-white text-sm flex items-center justify-center">
                        2
                      </span>
                      <span>Connections</span>
                    </li>
                    <li className=" text-base text-primary px-2 py-1 rounded-md cursor-pointer">
                      Favorites
                    </li>
                  </ul>

                  <button
                    type="button"
                    className="rounded-full p-1 text-gray-400 focus:outline-none"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
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
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Your Profile
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Settings
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Sign out
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
