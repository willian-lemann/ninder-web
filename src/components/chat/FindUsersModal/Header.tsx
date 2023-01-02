import { useAuthContext } from "@context/auth";
import { useChatsContext } from "@context/chat";
import { ChatDTO } from "@data/dtos";
import { getNow } from "@functions/getNow";
import { Dialog } from "@headlessui/react";
import { XMarkIcon as CloseIcon } from "@heroicons/react/24/outline";
import { classNames } from "@utils/classNames";
import { uuid } from "@utils/uniqueId";
import { ContentType, SelectedUser } from "./types";

interface HeaderProps {
  selectedUser: SelectedUser;
  contentType: ContentType;
  onCloseModal(): void;
  onNext(selectedUser: SelectedUser): void;
}

export const Header = ({
  selectedUser,
  contentType,
  onNext,
  onCloseModal,
}: HeaderProps) => {
  return (
    <Dialog.Title
      as="h3"
      className="text-lg font-medium leading-6 text-gray-900"
    >
      <div className="flex items-center justify-between px-6">
        <CloseIcon className="h-6 w-6 cursor-pointer" onClick={onCloseModal} />
        <span className="text-black">New Message</span>
        <button
          onClick={() => onNext(selectedUser)}
          className={classNames(
            selectedUser.id || contentType === "Next"
              ? "opacity-100 font-bold cursor-pointer"
              : "opacity-50  cursor-default",
            "text-primary transition-colors duration-300"
          )}
        >
          Next
        </button>
      </div>
    </Dialog.Title>
  );
};
