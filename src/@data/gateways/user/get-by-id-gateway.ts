import { prisma } from "@config/prisma";

export async function getByIdGateway(id: string) {
  const users = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      password: false,
    },
  });

  return users;
}
