import { firestore } from "@config/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  documentId,
} from "firebase/firestore";

export async function getFavoritesGateway(currentUserId: string) {
  const favoritesRef = collection(firestore, "favorites");

  const q = query(favoritesRef, where(documentId(), "==", currentUserId));

  const docs = await getDocs(q);

  return docs.docs;
}
