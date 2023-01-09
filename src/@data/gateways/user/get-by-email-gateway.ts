import { prisma } from "@config/prisma";

export async function getByEmailGateway(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
}
