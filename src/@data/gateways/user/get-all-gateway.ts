import { prisma } from "@config/prisma";
import { exclude } from "@utils/exclude";

export async function getAllGateway(userId: string) {
  const users = await prisma.user.findMany({
    where: {
      id: {
        not: userId,
      },
    },
  });

  users.forEach((user) => exclude(user, ["password"]));

  return users;
}
