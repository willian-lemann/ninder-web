import { prisma } from "@config/prisma";

export async function authenticateService(email: string, password: string) {
  // TODO: checar se tem usuario no banco
  const userRegister = prisma.user.findUnique({ where: { email } });
  // TODO: se tiver, eu gerar um token com as info do usuario
}
