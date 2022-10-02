import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AlertProvider } from "../components/shared/alert";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <AlertProvider />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
