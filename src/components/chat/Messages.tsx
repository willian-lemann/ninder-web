import { useState } from "react";
import { uuid } from "@utils/uniqueId";

import { useUserMessages } from "@context/chat/useUserMessages";

import { PaperAirplaneIcon as SendIconOutlined } from "@heroicons/react/24/outline";
import { PaperAirplaneIcon as SendIconSolid } from "@heroicons/react/24/solid";

import { sendMessageService } from "@services/chat/sendMessageService";

import { ChatModel } from "@models/chat";

import { MessageItem } from "./MessageItem";
import { SendMessageDto } from "@dtos/chat/send-message-dto";
import { Timestamp } from "firebase/firestore";
import { useAuthContext } from "@context/auth";
import Image from "next/image";
import { Loading } from "@components/shared/Loading";

interface MessagesProps {
  chat: ChatModel | null;
}

export const Messages = ({ chat }: MessagesProps) => {
  const { user: currentUser } = useAuthContext();
  console.log("caiu aqui", chat?.id);
  const { messages, isLoading, mutate, isEmpty } = useUserMessages({
    chatId: chat?.id || "",
  });
  const [messageText, setMessageText] = useState("");

  const handleSendMessage = async () => {
    const newMessage: SendMessageDto = {
      chatId: chat?.id as string,
      messageText,
      user: {
        id: chat?.user.id as string,
        name: chat?.user.name as string,
        avatar: chat?.user.avatar as string,
      },
      sentBy: currentUser?.id as string,
      sentAt: Timestamp.fromDate(new Date()),
    };

    if (messages) {
      mutate(
        [
          ...messages,
          {
            id: uuid(),
            ...newMessage,
          },
        ],
        false
      );
    }

    setMessageText("");

    await sendMessageService(newMessage);
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

  if (isEmpty || !chat) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-52 h-52">
            <Image src="/icons/empty.svg" alt="empty icon" fill />
          </div>

          <h1 className="text-zinc-400 text-lg">No result.</h1>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="h-12 flex items-center pl-4">
        <strong>{chat?.user.name}</strong>
      </div>

      <div className="h-full w-full flex flex-col divide-y relative">
        <ul className="h-full overflow-auto flex flex-col px-10">
          {messages?.map((message) => (
            <MessageItem
              key={message.id}
              message={{
                id: message?.id as string,
                avatar: chat?.user?.avatar as string,
                name: chat?.user.name as string,
                sentBy: message.sentBy,
                date: message.sentAt,
                messageText: message.messageText,
              }}
            />
          ))}
        </ul>

        <div className="py-4 flex flex-col justify-center mx-4">
          <div className="flex items-center">
            <input
              placeholder="Type here"
              className="rounded-full flex-1 h-[45px] px-5 outline-none bg-zinc-100"
              value={messageText}
              onChange={({ target }) => setMessageText(target.value)}
            />

            {messageText ? (
              <SendIconSolid
                height={24}
                width={24}
                className="cursor-pointer ml-1 opacity-100 text-primary animate-fadeIn"
                onClick={handleSendMessage}
              />
            ) : (
              <SendIconOutlined
                height={24}
                width={24}
                className="cursor-default ml-1 opacity-75 text-primary animate-fadeIn"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
