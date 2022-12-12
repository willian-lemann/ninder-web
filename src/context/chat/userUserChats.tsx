import { collection, onSnapshot, query, where } from "firebase/firestore";
import { firestore } from "@config/firebase";

import { useEffect, useState } from "react";
import { useAuthContext } from "@context/auth";
import useSWR from "swr";
import { getUserChatsService } from "@services/chat/getUserChatsService";
import { Chat } from "@models/chat";

export const useUserChats = () => {
  const { user } = useAuthContext();

  const { data, error } = useSWR("/chats", () =>
    getUserChatsService(user?.id as string).then((chat) => chat)
  );

  const chatUsersRef = collection(firestore, "chats");

  onSnapshot(chatUsersRef, (docSnap) => {
    docSnap.forEach((doc) => {
      //  mutate([{ ...doc.data(), id: doc.id }], false);
    });
  });

  console.log(data);

  return {
    error,
    isLoading: !data,
    chats: data,
  };
};
