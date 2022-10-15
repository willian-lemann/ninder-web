import type { AppProps } from "next/app";
import "firebase/firestore";
import "@config/firebase";

import "@styles/globals.css";

import { AlertProvider } from "../components/shared/alert";

import { Provider } from "../context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <AlertProvider />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
