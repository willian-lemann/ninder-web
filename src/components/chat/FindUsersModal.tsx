import { Fragment, useState } from "react";

import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import { XMarkIcon as CloseIcon } from "@heroicons/react/24/solid";
import { CheckCircleIcon as SolidCheckIcon } from "@heroicons/react/24/solid";
import { CheckCircleIcon as OutlineCheckIcon } from "@heroicons/react/24/outline";

import { useUsers } from "@context/users";
import { useGeoLocation } from "@hooks/useGeoLocation";
import { Avatar } from "./Avatar";
import { classNames } from "@utils/classNames";

export const FindUsersModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedUser, setSelectedUser] = useState("");

  const location = useGeoLocation();

  const { users } = useUsers("", location);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-gradient-to-r from-light-primary to-primary hover:brightness-90 transition-all duration-300 px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Send Message
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl py-6 bg-white text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    <div className="flex items-center justify-between px-6">
                      <CloseIcon
                        className="h-6 w-6 cursor-pointer"
                        onClick={closeModal}
                      />
                      <span>New Message</span>
                      <span
                        className={classNames(
                          selectedUser ? "opacity-100" : "opacity-50",
                          "text-primary transition-colors duration-300"
                        )}
                      >
                        Next
                      </span>
                    </div>
                  </Dialog.Title>

                  <RadioGroup
                    className="mt-4 w-full"
                    value={selectedUser}
                    onChange={setSelectedUser}
                  >
                    {users?.map((user) => (
                      <RadioGroup.Option
                        key={user.id}
                        value={user.id}
                        className="last:mb-0 mb-3"
                      >
                        {({ checked }) => (
                          <li className="flex items-center justify-between cursor-pointer hover:bg-zinc-200 px-6">
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
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
