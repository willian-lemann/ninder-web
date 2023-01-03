import { firestore } from "@config/firebase";
import { setDoc, doc, collection, addDoc } from "firebase/firestore";

export async function createFavoriteGateway(
  currentUserId: string,
  userId: string
) {
  const favoritesRef = doc(firestore, "favorites", currentUserId);

  await setDoc(favoritesRef, { userId });
}
