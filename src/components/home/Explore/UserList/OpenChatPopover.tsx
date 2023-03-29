import { useAuthContext } from "@context/auth";
import { useChatsContext } from "@context/chat";
import { useMessagesContext } from "@context/messages";

import { User } from "@data/models/user";
import { NewMessageEventDto } from "@dtos/chat/new-message-dto";
import { Popover, Transition } from "@headlessui/react";
import { ChatBubbleLeftEllipsisIcon as ChatIcon } from "@heroicons/react/24/outline";
import { uuid } from "@utils/uniqueId";
import Router from "next/router";
import { Fragment, MouseEvent, useState } from "react";

type OpenChatPopoverProps = {
  user: User;
};

export const OpenChatPopover = ({ user }: OpenChatPopoverProps) => {
  const { sendMessage } = useMessagesContext();
  const { user: currentUser } = useAuthContext();
  const { checkHasChat } = useChatsContext();

  const [messageText, setMessageText] = useState("");

  const handleOpenPopover = () => {
    const hasChat = checkHasChat(user.id as string);

    if (hasChat) {
      return Router.push("/chats");
    }
  };

  const handleSendMessage = async (user: User) => {
    const message: NewMessageEventDto = {
      chatId: null,
      message: messageText,
      userId: user.id as string,
      createdBy: currentUser?.id as string,
    };

    await sendMessage(message);
  };

  const handleClickPanel = (
    event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    event.stopPropagation();
  };

  return (
    <Popover className="relative text-[0]">
      <Popover.Button onClick={handleOpenPopover}>
        <ChatIcon className="h-7 w-7 z-20 cursor-pointer text-zinc-600 animate-fadeIn" />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="">
          <div
            onClick={(event) => handleClickPanel(event)}
            className="absolute -top-20 -right-full rounded-md h-[100px] w-[300px]"
          >
            <textarea
              value={messageText}
              onChange={({ target }) => setMessageText(target.value)}
              placeholder="type message.."
              className="z-20 resize-none p-4 text-base outline-none h-full w-full rounded-md  shadow-md"
            />

            <button
              onClick={() => handleSendMessage(user)}
              className="z-20 text-sm absolute right-2 bottom-2 text-primary"
            >
              Send
            </button>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};
