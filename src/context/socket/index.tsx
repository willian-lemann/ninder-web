import { STORAGE_KEY } from "@constants/login/auth";
import { parseCookies } from "nookies";
import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useEffect,
} from "react";

import io, { Socket } from "socket.io-client";

const SocketContext = createContext({} as Socket);

type SocketProviderProps = { children: ReactNode };

const API_URL = process.env.NEXT_PUBLIC_API_URL_SOCKET as string;

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const cookies = parseCookies();

  const socket = useMemo<Socket>(
    () =>
      io(API_URL, {
        transportOptions: {
          polling: {
            extraHeaders: {
              Authorization: `Bearer ${cookies[STORAGE_KEY]}`, // 'Bearer h93t4293t49jt34j9rferek...'
            },
          },
        },
      }),
    [cookies]
  );

  useEffect(() => {
    socket.on("connect", () => {
      console.log("app connected.");
    });
  }, [socket]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocketContext = () => useContext(SocketContext);
