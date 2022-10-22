import type { AppProps } from "next/app";
import "firebase/firestore";
import "@config/firebase";

import "@styles/globals.css";

import { AlertProvider } from "../components/shared/alert";

import { Provider } from "../context";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps, session }: AppProps) {
  return (
    <Provider>
      <AlertProvider />
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </Provider>
  );
}

export default MyApp;
