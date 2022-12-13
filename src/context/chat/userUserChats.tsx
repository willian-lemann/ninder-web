import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "@config/firebase";

import { useEffect } from "react";
import { useAuthContext } from "@context/auth";
import useSWR from "swr";
import { getUserChatsService } from "@services/chat/getUserChatsService";
import { Chat } from "@models/chat";

export const useUserChats = () => {
  const { user } = useAuthContext();

  const { data, error, mutate, isLoading, isValidating } = useSWR(
    "/chats",
    () => getUserChatsService(user?.id as string).then((chat) => chat)
  );

  const chatUsersRef = collection(firestore, "chats");

  useEffect(() => {
    const sub = onSnapshot(chatUsersRef, (docSnap) => {
      docSnap.forEach((doc) => {
        if (data && !isValidating) {
          const newChat = { ...doc.data(), id: doc.id } as Chat;
          mutate([...data, newChat]);
        }
      });
    });

    return sub;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    error,
    isLoading,
    chats: data,
  };
};
