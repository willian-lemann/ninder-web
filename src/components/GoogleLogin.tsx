import { useEffect, useRef } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string;

export function GoogleLogin() {
  return <button onClick={() => signIn()}>Sign in</button>;
}
