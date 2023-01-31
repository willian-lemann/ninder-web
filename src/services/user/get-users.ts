import { prisma } from "@config/prisma";
import { User } from "@data/models/user";
import { exclude } from "@utils/exclude";
import { getDistanceAway } from "@utils/getDistanceAway";

export async function getUsersService(userId: string) {
  const currentUser = await prisma.user.findUnique({ where: { id: userId } });

  const users = await prisma.user.findMany({ where: { NOT: { id: userId } } });

  users.forEach((user) => {
    exclude(user, ["password"]);
  });

  users.forEach((user) => {
    return {
      ...user,
      distanceAway: getDistanceAway({
        sourceLocation: {
          latitude: currentUser?.latitude as number,
          longitude: currentUser?.longitude as number,
        },

        targetLocation: {
          latitude: user.latitude as number,
          longitude: user.longitude as number,
        },
      }),
    };
  });

  return users;
}
