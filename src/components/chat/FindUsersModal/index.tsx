import { Fragment, useCallback, useState } from "react";

import { Dialog, Transition } from "@headlessui/react";

import { Header } from "./Header";
import { Content } from "./Content";
import { ContentType, SelectedUser } from "./types";
import { useChatsContext } from "@context/chat";
import { useAuthContext } from "@context/auth";

export const FindUsersModal = () => {
  const { startNewChat } = useChatsContext();
  const { user } = useAuthContext();
  const [messageText, setMessageText] = useState("");
  const [selectedUser, setSelectedUser] = useState<SelectedUser>({
    id: "",
    avatar: "",
    name: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [contentType, setContentType] = useState<ContentType>("List");

  const handleChangeMessageText = useCallback((message: string) => {
    setMessageText(message);
  }, []);

  const handleNext = useCallback(
    async (selectedUser: SelectedUser) => {
      if (contentType === "Next") {
        await startNewChat({
          messageText,
          userId: user?.id as string,
          talkingUser: selectedUser,
        });
      }

      setSelectedUser(selectedUser);
      setContentType("Next");
    },
    [contentType, messageText, startNewChat, user?.id]
  );

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setSelectedUser({
      id: "",
      avatar: "",
      name: "",
    });
    setContentType("List");
  }, []);

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
                  <Header
                    contentType={contentType}
                    selectedUser={selectedUser}
                    onCloseModal={closeModal}
                    onNext={handleNext}
                  />

                  <Content
                    contentType={contentType}
                    selectedUser={selectedUser}
                    onChangeSelectedUser={setSelectedUser}
                    onChangeMessageText={handleChangeMessageText}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
