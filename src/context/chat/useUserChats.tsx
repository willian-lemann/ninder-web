import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "@config/firebase";

import { useEffect } from "react";

import useSWR from "swr";
import { getUserChatsService } from "@services/chat/getUserChatsService";
import { ChatModel } from "@models/chat";
import { User } from "@models/user";

export const useUserChats = (user: User | null) => {
  const { data, error, mutate } = useSWR(
    "/chats",
    () =>
      getUserChatsService({
        id: user?.id as string,
        name: user?.name as string,
        avatar: user?.avatar as string,
      }).then((chat) => chat),
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
    }
  );

  const chatUsersRef = collection(firestore, "chats");

  useEffect(() => {
    const sub = onSnapshot(chatUsersRef, (docSnap) => {
      docSnap.forEach((doc) => {
        if (data) {
          const newChat = { ...doc.data(), id: doc.id } as ChatModel;
          mutate([...data, newChat], false);
        }
      });
    });

    return sub;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    error,
    mutate,
    isLoading: !data,
    chats: data,
  };
};
