import { auth, firestore } from "@config/firebase";
import { geohashQueryBounds } from "geofire-common";

import { User } from "@data/entities/user";
import { getDistanceBetweenTwoCoords } from "@utils/getDistanceBetweenTwoCoords";
import {
  getDocs,
  collection,
  query,
  orderBy,
  startAt,
  endAt,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Location } from "@dtos/users/location";
import { getUserUseCase } from "./getUserUseCase";

const DISTANCE = 10; // KM
const RADIUS_IN_METERS = DISTANCE * 1000;

export async function getUsersUseCase(location?: Location | null) {
  let currentUserId: string | undefined;
  onAuthStateChanged(auth, (response) => (currentUserId = response?.uid));

  const bounds = geohashQueryBounds(
    [Number(location?.latitude), Number(location?.longitude)],
    RADIUS_IN_METERS
  );

  const currentUser = await getUserUseCase(currentUserId as string);

  const promises = bounds.map(async (bound) => {
    const usersRef = collection(firestore, "users");
    const docsSnap = query(
      usersRef,
      orderBy("name"),
      startAt(bound[0]),
      endAt(bound[1])
    );

    const docs = await getDocs(docsSnap);

    return docs;
  });

  const users = await Promise.all(promises).then((snapshots) => {
    const matchingDocs: User[] = [];

    snapshots.forEach((snap) => {
      return snap.docs.map((doc) => {
        const location = doc.get("location");

        const distance = getDistanceBetweenTwoCoords({
          currentLocation: currentUser?.location,
          targetLocation: location,
        });

        if (Number(distance) <= RADIUS_IN_METERS) {
          const user = { ...doc.data(), id: doc.id } as User;

          matchingDocs.push(user);
        }
      });
    });

    return matchingDocs;
  });

  console.log("users");
  // const filteredUsersByDistance = mappedUsers.filter((user) => {
  //   const distance = getDistanceBetweenTwoCoords({
  //     currentLocation: currentUser.location,
  //     targetLocation: user.location,
  //   });

  //   if (Number(distance) <= RADIUS_IN_METERS) {
  //     return {
  //       ...user,
  //     };
  //   }

  //   return null;
  // });

  return {
    data: {
      result: users,
    },
  };
}
