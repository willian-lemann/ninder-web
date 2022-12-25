import {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { uuid } from "@utils/uniqueId";

import { useUserMessages } from "@context/messages/useUserMessages";

import { PaperAirplaneIcon as SendIconOutlined } from "@heroicons/react/24/outline";
import { PaperAirplaneIcon as SendIconSolid } from "@heroicons/react/24/solid";

import { sendMessageUseCase } from "@data/useCases/chat";

import { MessageItem } from "./MessageItem";
import { SendMessageDto } from "@dtos/chat/send-message-dto";
import { Timestamp } from "firebase/firestore";
import { useAuthContext } from "@context/auth";
import Image from "next/image";
import { Loading } from "@components/shared/Loading";
import { useMessagesContext } from "@context/messages";
import { useBottomScroll } from "@hooks/useBottomScroll";
import { ChatDTO } from "@data/dtos";

interface MessagesProps {
  chat: ChatDTO | null;
}

export const Messages = ({ chat }: MessagesProps) => {
  const { user: currentUser } = useAuthContext();
  const { messages, isLoading, isEmpty, loadMessages, sendMessage } =
    useMessagesContext();
  const [messageText, setMessageText] = useState("");
  const { ElementToBeScrolled } = useBottomScroll({
    listener: messages,
  });

  const handleSendMessage = async () => {
    const message: SendMessageDto = {
      chatId: chat?.id as string,
      messageText,
      user: {
        id: chat?.user.id as string,
        name: chat?.user.name as string,
        avatar: chat?.user.avatar as string,
      },
      sentBy: currentUser?.id as string,
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

  useEffect(() => {
    if (chat?.id) {
      loadMessages(chat?.id as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chat?.id]);

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

  if (!chat?.id) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-52 h-52">
            <Image src="/icons/empty.svg" alt="empty icon" fill />
          </div>

          <h1 className="text-zinc-400 text-lg">Start chat with someone</h1>
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
        {isEmpty ? (
          <div className="h-full flex items-center justify-center overflow-auto flex-col px-10">
            <h1 className="text-zinc-400">
              No messages yet with {chat.user.name}
            </h1>
          </div>
        ) : (
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

            <ElementToBeScrolled />
          </ul>
        )}

        <div className="py-4 flex flex-col justify-center mx-4">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Type here"
              className="rounded-full flex-1 h-[45px] px-5 outline-none bg-zinc-100"
              value={messageText}
              onChange={({ target }) => setMessageText(target.value)}
              onKeyUp={handleSendMessageByEnterKey}
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
