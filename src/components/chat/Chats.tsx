import { Loading } from "@components/shared/Loading";

import { ChatDTO } from "@data/dtos/chat";
import { Timestamp } from "firebase/firestore";
import { ChatItem } from "./ChatItem";
import { useChatsContext } from "@context/chat";
import { useMemo, useState } from "react";

export const Chats = () => {
  const { chats, isLoading, focusInChat, currentChat } = useChatsContext();

  const isSelected = useMemo(() => {
    const firstChat = chats.at(0)?.id;
    return currentChat?.id || firstChat;
  }, [chats, currentChat]);

  const handleSelectChat = async (chat: ChatDTO) => {
    await focusInChat(chat.id as string);
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="flex flex-col gap-4 items-center">
          <Loading />
          <span>Preparing chats...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="h-12 flex items-center">
        <h1 className="text-lg">Chats</h1>
      </div>

      <ul className="overflow-auto">
        {chats.map((chat) => (
          <ChatItem
            key={chat?.id}
            chat={{
              id: chat.id,
              avatar: chat.user?.avatar,
              title: chat.user?.name,
              subtitle: chat.lastMessage?.message as string,
              sentAt: chat.lastMessage?.sentAt as Timestamp,
              isUnRead: chat.lastMessage?.unRead as boolean,
              sentBy: chat.lastMessage?.sentBy as string,
            }}
            isSelected={isSelected === chat.id}
            onSelectChat={() => handleSelectChat(chat)}
          />
        ))}
      </ul>
    </>
  );
};
