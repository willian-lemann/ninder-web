import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "@config/firebase";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import useSWR from "swr";
import { getUserChatsService } from "@services/chat/getUserChatsService";
import { Chat, ChatModel, User } from "@models/chat";
import { User as CurrentUser } from "@models/user";
import { useAuthContext } from "@context/auth";

export interface InitialState {
  chats: ChatModel[];
  isEmpty: boolean;
  isLoading: boolean;
  mutate: Dispatch<SetStateAction<ChatModel[]>>;
  hasChatWith: (userId: string) => string;
}

function getUserChatWith(currentUser: CurrentUser, users: User[]) {
  const userChatWith = users.find((user) => user.id !== currentUser.id);
  return userChatWith;
}

export const useUserChats = (): InitialState => {
  const { user } = useAuthContext();
  const [chats, setChats] = useState<ChatModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const isEmpty = chats.length === 0 && !isLoading;

  const hasChatWith = (userId: string) => {
    const chat = chats?.find((chat) => chat.user.id === userId);
    return chat?.id as string;
  };

  useEffect(() => {
    if (!user) return;

    const chatUsersRef = collection(firestore, "chats");
    const sub = onSnapshot(chatUsersRef, (docSnap) => {
      docSnap.forEach((doc) => {
        if (user) {
          const newChatData = { ...doc.data(), id: doc.id } as Chat;

          const userChatWith = getUserChatWith(user, newChatData.users);

          const newChat = {
            ...newChatData,
            user: userChatWith,
          } as ChatModel;

          setChats((state) => [...state, newChat]);
        }
      });
    });

    return sub;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const loadChats = async () => {
      const chats = await getUserChatsService({
        id: user?.id as string,
        name: user?.name as string,
        avatar: user?.avatar as string,
      });

      setChats(chats);
    };

    if (user) {
      loadChats().finally(() => setIsLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return { isEmpty, mutate: setChats, hasChatWith, isLoading, chats };
};
