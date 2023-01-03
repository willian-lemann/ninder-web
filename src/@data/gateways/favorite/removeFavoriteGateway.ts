import { firestore } from "@config/firebase";
import { deleteDoc, doc } from "firebase/firestore";

export async function removeFavoriteGateway(id: string) {
  const favoriteRef = doc(firestore, "favorites", id);

  await deleteDoc(favoriteRef);
}
