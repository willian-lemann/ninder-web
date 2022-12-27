import { auth, firestore } from "@config/firebase";
import { User } from "@data/entities/user";
import { getDistanceBetweenTwoCoords } from "@utils/getDistanceBetweenTwoCoords";
import { getDocs, collection, query, orderBy } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Location } from "@dtos/users/location";

const DISTANCE = 10; // KM

function getNearbyUsersByDistance(
  users: User[],
  currentUserId?: string,
  centerLocation?: Location | null
) {
  const currentUser = users.find((item) => item.id === currentUserId) as User;

  const filteredUsersByDistance = users.filter((user) => {
    const distance = getDistanceBetweenTwoCoords({
      currentLocation: currentUser.location,
      targetLocation: user.location,
    });

    const distanceBetweenCurrentCenterAndCurrentLocation =
      getDistanceBetweenTwoCoords({
        currentLocation: centerLocation,
        targetLocation: user.location,
      });

    console.log("newDistance", distanceBetweenCurrentCenterAndCurrentLocation);

    if (
      Math.floor(Number(distanceBetweenCurrentCenterAndCurrentLocation)) <
      DISTANCE
    ) {
      return {
        ...user,
      };
    }

    return null;
  });

  return filteredUsersByDistance;
}

export async function getUsersUseCase(location?: Location | null) {
  let currentUserId: string | undefined;
  onAuthStateChanged(auth, (response) => (currentUserId = response?.uid));

  const usersRef = collection(firestore, "users");
  const docsSnap = query(usersRef, orderBy("name"));

  const docUsers = await getDocs(docsSnap);

  // if (queryFilter) {
  //   const filteredDocSnap = query(
  //     usersRef,
  //     orderBy("name"),
  //     where("name", ">=", queryFilter),
  //     where("name", "<", `${queryFilter}z`)
  //   );

  //   const filteredDocUsers = await getDocs(filteredDocSnap);

  //   const mappedFilteredUsers = filteredDocUsers.docs.map((doc) => ({
  //     ...doc.data(),
  //     id: doc.id,
  //   })) as User[];

  //   const filteredUsers = getNearbyUsersByDistance(
  //     mappedFilteredUsers,
  //     currentUserId
  //   );

  //   return {
  //     data: {
  //       result: filteredUsers,
  //     },
  //   };
  // }

  const mappedUsers = docUsers.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as User[];

  const nearbyUsersByDistance = getNearbyUsersByDistance(
    mappedUsers,
    currentUserId,
    location
  );

  return {
    data: {
      result: nearbyUsersByDistance,
    },
  };
}
