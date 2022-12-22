import "react-chat-elements/dist/main.css";
import { useState } from "react";

import { ChatModel } from "@models/chat";
import { Chats } from "@components/chat/Chats";
import { Messages } from "@components/chat/Messages";
import { Timestamp } from "firebase/firestore";
import { useChatsContext } from "@context/chat";
import { updateChatService } from "@services/chat/updateChatService";
import { addErrorNotification } from "@components/shared/alert";

export default function ChatPage() {
  const [chat, setChat] = useState<ChatModel | null>(null);
  const { chats, mutate } = useChatsContext();

  const handleStartChatting = async (chat: ChatModel) => {
    setChat(chat);

    const previousChats = structuredClone(chats);

    const newChats = chats.map((chatItem) => {
      if (chatItem.id === chat.id) {
        return {
          ...chatItem,
          lastMessage: {
            ...chatItem.lastMessage,
            unRead: false,
          },
        };
      }

      return chatItem;
    });

    try {
      await updateChatService(chat.id, {
        lastMessage: { ...chat.lastMessage, unRead: false },
      });

      mutate(newChats);
    } catch (error) {
      mutate(previousChats);
      addErrorNotification(JSON.stringify(error));
    }
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
