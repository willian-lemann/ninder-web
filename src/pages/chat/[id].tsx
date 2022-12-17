import "react-chat-elements/dist/main.css";
import { useState } from "react";
import { v4 as uuid } from "uuid";

import { ChatModel } from "@models/chat";

import { PaperAirplaneIcon as SendIconOutlined } from "@heroicons/react/24/outline";
import { PaperAirplaneIcon as SendIconSolid } from "@heroicons/react/24/solid";

import { ChatItem } from "@components/chat/ChatItem";
import { MessageItem } from "@components/chat/MessageItem";
import { useUserChats } from "@context/chat/userUserChats";
import { useUserMessages } from "@context/chat/useUserMessages";
import { sendMessageService } from "@services/chat/sendMessageService";
import { SendMessageDto } from "@dtos/chat/send-message-dto";
import { useAuthContext } from "@context/auth";
import { serverTimestamp, Timestamp } from "firebase/firestore";
import { Loading } from "@components/shared/Loading";

export default function ChatPage() {
  const { user } = useAuthContext();
  const { chats, isLoading: isLoadingChats } = useUserChats();
  const [chat, setChat] = useState<ChatModel | null>(null);
  const {
    messages,
    isLoading: isLoadingMessages,
    mutate,
  } = useUserMessages({
    chatId: chat?.id || "",
  });

  const [messageText, setMessageText] = useState("");

  const handleSendMessage = async () => {
    const newMessage: SendMessageDto = {
      chatId: chat?.id as string,
      messageText,
      sentBy: user?.id as string,
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

  const handleStartChatting = (chat: ChatModel) => {
    setChat(chat);
  };

  if (isLoadingChats)
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Loading />
      </div>
    );

  return (
    <div className="container overflow-hidden">
      <header className="h-[60px] flex items-center">
        <h1>Logo</h1>
      </header>

      <main className="grid grid-cols-[1fr,2fr] auto-rows-[calc(100vh-60px)] divide-x">
        <section className="h-auto max-h-screen">
          <div className="h-12 flex items-center">
            <h1 className="text-lg">Messages</h1>
          </div>

          <ul className="overflow-auto">
            {chats?.map((chat) => (
              <ChatItem
                key={chat?.id}
                avatar={chat.user?.avatar}
                title={chat.user?.name}
                subtitle={chat.lastMessage?.message as string}
                sentAt={chat.lastMessage?.sentAt as Timestamp}
                unread={0}
                onStartChatting={() => handleStartChatting(chat)}
              />
            ))}
          </ul>
        </section>

        <section className="h-[calc(100%-60px)]">
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

            <div className="py-4 flex flex-col justify-center px-4">
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
        </section>
      </main>
    </div>
  );
}
