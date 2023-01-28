import { KeyboardEvent, useRef, useState } from "react";

import { EmojiPicker, EmojiClickData, Handles } from "./EmojiPIcker";

import {
  PaperAirplaneIcon as SendIconOutlined,
  FaceSmileIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { PaperAirplaneIcon as SendIconSolid } from "@heroicons/react/24/solid";

import { MessageItem } from "./MessageItem";
import { NewMessageDto } from "@dtos/chat/send-message-dto";

import { useAuthContext } from "@context/auth";
import Image from "next/image";
import { Loading } from "@components/shared/Loading";
import { useMessagesContext } from "@context/messages";
import { useBottomScroll } from "@hooks/useBottomScroll";

import { isEmptyString } from "@functions/asserts/isEmpty";
import { FindUsersModal, FindUsersModalHandles } from "./FindUsersModal";
import { useChatsContext } from "@context/chat";
import { useUserMessages } from "@context/messages/useUserMessages";

export const Messages = () => {
  const { user: currentUser } = useAuthContext();
  const { currentChat } = useChatsContext();
  const { messages, isLoading, isEmpty, sendMessage } = useUserMessages(
    currentChat?.id
  );

  const findUsersModalRef = useRef<FindUsersModalHandles>(null);
  const emojiRef = useRef<Handles>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [messageText, setMessageText] = useState("");
  const { ElementToBeScrolled } = useBottomScroll({
    listener: messages,
  });

  const handleOpenEmoji = () => {
    emojiRef.current?.openEmojiPicker();
  };

  const handleChangeEmoji = (
    emojiData: EmojiClickData,
    event: globalThis.MouseEvent
  ) => {
    const startPosition = Number(inputRef.current?.selectionStart);

    const messageText = inputRef.current?.value as string;

    const messageTextConcatedWithEmoji =
      messageText.slice(0, startPosition) +
      emojiData.emoji +
      messageText.slice(startPosition);

    setMessageText(messageTextConcatedWithEmoji);
  };

  const handleSendMessage = async () => {
    const message: NewMessageDto = {
      chatId: currentChat?.id as string,
      message: messageText,
      userId: currentChat?.user.id as string,
    };

    setMessageText("");

    await sendMessage(message);
  };

  const handleSendMessageByEnterKey = async (
    event: KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      await handleSendMessage();
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="flex flex-col gap-4 items-center">
          <Loading />
          <span>Preparing messages...</span>
        </div>
      </div>
    );
  }
  console.log(currentChat);

  if (!currentChat) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-52 h-52">
            <Image src="/icons/empty.svg" alt="empty icon" fill />
          </div>

          <h1 className="text-zinc-400 text-lg">Start chat with someone</h1>
          <p className="text-zinc-400 text-sm">
            Send private photos and messages to a friend or group
          </p>

          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={() => findUsersModalRef.current?.openModal()}
              className="rounded-md bg-gradient-to-r from-light-primary to-primary hover:brightness-90 transition-all duration-300 px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
              Send Message
            </button>
          </div>

          <FindUsersModal ref={findUsersModalRef} />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="h-12 flex items-center justify-between px-12">
        <strong>{currentChat?.user.name}</strong>

        <InformationCircleIcon className="h-6 w-6 cursor-pointer" />
      </div>

      <div className="h-full w-full flex flex-col divide-y relative">
        {isEmpty ? (
          <div className="h-full flex items-center justify-center overflow-auto flex-col px-10">
            <h1 className="text-zinc-400">
              No messages yet with {currentChat.user.name}
            </h1>
          </div>
        ) : (
          <ul className="h-full overflow-auto flex flex-col px-10">
            {messages?.map((message) => (
              <MessageItem
                key={message.id}
                message={{
                  id: message?.id as string,
                  avatar: currentChat?.user?.avatar as string,
                  name: currentChat?.user.name as string,
                  sentBy: message.sentBy,
                  date: message.createdAt,
                  messageText: message.message,
                }}
              />
            ))}

            <ElementToBeScrolled />
          </ul>
        )}

        <div className="py-4 flex flex-col justify-center mx-4">
          <EmojiPicker ref={emojiRef} onEmojiClick={handleChangeEmoji} />

          <div className="flex items-center">
            <div className="relative flex items-center rounded-full flex-1 h-[45px]">
              <FaceSmileIcon
                height={30}
                width={30}
                className="absolute mx-4 cursor-pointer"
                onClick={handleOpenEmoji}
              />

              <input
                ref={inputRef}
                type="text"
                placeholder="Message..."
                className="flex-1 px-14 outline-none h-full rounded-full bg-zinc-100"
                value={messageText}
                onChange={({ target }) => setMessageText(target.value)}
                onKeyUp={handleSendMessageByEnterKey}
              />
            </div>

            {isEmptyString(messageText) ? (
              <SendIconOutlined
                height={24}
                width={24}
                className="cursor-default ml-1 opacity-75 text-primary animate-fadeIn"
              />
            ) : (
              <SendIconSolid
                height={24}
                width={24}
                className="cursor-pointer ml-1 opacity-100 text-primary animate-fadeIn"
                onClick={handleSendMessage}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
