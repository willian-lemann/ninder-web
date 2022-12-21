import "react-chat-elements/dist/main.css";
import { useState } from "react";

import { ChatModel } from "@models/chat";
import { Chats } from "@components/chat/Chats";
import { Messages } from "@components/chat/Messages";

export default function ChatPage() {
  const [chat, setChat] = useState<ChatModel | null>(null);

  const handleStartChatting = (chat: ChatModel) => {
    setChat(chat);
  };

  return (
    <div className="container overflow-hidden">
      <header className="h-[60px] flex items-center">
        <h1>Logo</h1>
      </header>

      <main className="grid grid-cols-[1fr,2fr] auto-rows-[calc(100vh-60px)] divide-x">
        <section className="h-auto max-h-screen">
          <Chats onStartChatting={handleStartChatting} />
        </section>

        <section className="h-[calc(100%-60px)]">
          <Messages chat={chat} />
        </section>
      </main>
    </div>
  );
}
