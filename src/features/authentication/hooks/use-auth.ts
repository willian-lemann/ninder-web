import { useUser, useClerk } from "@clerk/nextjs";

import { useGeoLocation } from "@/hooks/useGeoLocation";
import { useEffect } from "react";

export function useAuth() {
  const { user } = useUser();
  const { signOut } = useClerk();

  useEffect(() => {
    (async () => {})();
  }, []);

  return {
    currentUser: user,
    signOut,
  };
}
