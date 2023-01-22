import { useMemo, useRef } from "react";
import { Timestamp } from "firebase/firestore";

import {
  PencilSquareIcon,
  MagnifyingGlassIcon as SearchIcon,
} from "@heroicons/react/24/solid";

import { FunnelIcon as FilterIcon } from "@heroicons/react/24/outline";

import { Loading } from "@components/shared/Loading";
import { ChatItem } from "./ChatItem";

import { ChatDTO } from "@data/dtos/chat";
import { useChatsContext } from "@context/chat";
import { FindUsersModal, FindUsersModalHandles } from "./FindUsersModal";
import { useUserChats } from "@context/chat/useUserChats";

export const Chats = () => {
  const { chats, currentChat, isLoading } = useChatsContext();
  const findUsersModalRef = useRef<FindUsersModalHandles>(null);

  console.log(chats);
  const isSelected = useMemo(() => {
    const firstChat = chats?.at(0)?.id;
    return currentChat?.id || firstChat;
  }, [chats, currentChat]);

  const handleSelectChat = async (chat: ChatDTO) => {};

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
      <div className="h-12 flex items-center justify-between px-6">
        <h1 className="text-xl font-bold">Chats</h1>
        <PencilSquareIcon
          className="h-6 w-6 cursor-pointer text-black"
          onClick={() => findUsersModalRef.current?.openModal()}
        />
      </div>

      <div className="flex items-center justify-between px-4 my-4">
        <div className="flex items-center rounded-md h-[45px] w-full">
          <SearchIcon className="w-6 h-6 ml-2 mr-2" />
          <input
            type="text"
            placeholder="Search"
            className="h-full w-full outline-none rounded-md"
          />
        </div>

        <FilterIcon className="w-6 h-6 ml-2 mr-2 cursor-pointer" />
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

      <FindUsersModal ref={findUsersModalRef} />
    </>
  );
};
