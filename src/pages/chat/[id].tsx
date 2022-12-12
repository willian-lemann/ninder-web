import "react-chat-elements/dist/main.css";
import { useState } from "react";

import { ChatItem } from "@components/chat/ChatItem";
import { MessageItem } from "@components/chat/MessageItem";
import { useUserChats } from "@context/chat/userUserChats";
import { useAuthContext } from "@context/auth";

export default function Chat() {
  const { user } = useAuthContext();
  const { data, isLoading } = useUserChats();

  const [messages, ,] = useState([
    {
      id: 1,
      avatar: "/icons/avatar.svg",
      name: "Name",
      message: "apsodkapodkpokdsapod apsodkapodk aspdokaspodk",
      date: new Date(),
    },
  ]);

  console.log(data);

  if (isLoading) return <p>loading...</p>;

  return (
    <div className="container">
      <header className="h-[60px] flex items-center">
        <h1>Logo</h1>
      </header>

      <main className="grid grid-cols-[1fr,2fr]  auto-rows-[calc(100vh-60px)] divide-x">
        <section className="overflow-auto h-auto max-h-screen">
          <div className="h-12 flex items-center">
            <h1 className="text-lg">Messages</h1>
          </div>

          <ul>
            {data?.map((chat) => (
              <ChatItem
                key={chat.id}
                avatar={chat.avatar}
                title={chat.title}
                subtitle={chat.subtitle}
                date={chat.date}
                unread={chat.unread}
              />
            ))}
          </ul>
        </section>

        <section className="h-[calc(100%-48px)]">
          <div className="h-12 flex items-center pl-4">
            <strong>Name 1</strong>
          </div>

          <div className="h-full w-full flex flex-col justify-between px-10 divide-y">
            <ul className="overflow-auto">
              {messages.map((message) => (
                <MessageItem
                  key={message.id}
                  avatar={message.avatar}
                  name={message.name}
                  message={message.message}
                  date={new Date()}
                />
              ))}
            </ul>

            <div className="h-28 flex  flex-col justify-center">
              <input
                placeholder="Type here"
                className="rounded-full h-[45px] px-5 outline-none bg-zinc-100"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
