import { firestore } from "@config/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function getFavoriteGateway(id: string) {
  const favoriteRef = doc(firestore, "favorites", id);

  return await getDoc(favoriteRef);
}
