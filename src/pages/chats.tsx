import "react-chat-elements/dist/main.css";
import { useState } from "react";
import { useRouter } from "next/router";

import { ArrowLeftOnRectangleIcon as BackIcon } from "@heroicons/react/24/solid";

import { ChatDTO } from "@data/dtos/chat";
import { Chats } from "@components/chat/Chats";
import { Messages } from "@components/chat/Messages";

import { useChatsContext } from "@context/chat";
import { updateChatUseCase } from "@data/useCases/chat";
import { addErrorNotification } from "@components/shared/alert";

export default function ChatPage() {
  const [chat, setChat] = useState<ChatDTO | null>(null);
  const { chats, mutate } = useChatsContext();
  const router = useRouter();

  const handleBack = () => {
    router.replace("/");
  };

  const handleStartChatting = async (chat: ChatDTO) => {
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
      const chatToBeUpdated = chats.find(
        (chatItem) => chatItem.id === chat.id
      ) as ChatDTO;

      await updateChatUseCase({
        id: chat.id,
        lastMessage: { ...chatToBeUpdated.lastMessage, unRead: false },
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
        <div className="flex items-center gap-4">
          <BackIcon
            height={24}
            width={24}
            className="cursor-pointer"
            onClick={handleBack}
          />
          <h1>Logo</h1>
        </div>
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
