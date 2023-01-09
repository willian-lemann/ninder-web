import { prisma } from "@config/prisma";
import { User } from "@data/entities";

export async function updateGateway(id: string, data: Partial<User>) {
  const updatedUser = await prisma.user.update({
    data,
    where: { id },
  });

  return updatedUser;
}
