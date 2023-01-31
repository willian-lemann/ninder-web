import { prisma } from "@config/prisma";
import { SignUpCredencials } from "@dtos/login/SignUpCredencials";
import { createApiResponse } from "@utils/createApiResponse";

export async function signupService(data: SignUpCredencials) {
  const createdAccount = prisma.user.create({ data });

  // TODO: checar se eu ja tenho usuario cadastrado
  // TODO: Se nao tiver eu crio um, e dps gero um token com as informacoes dele

  return createApiResponse({ result: createdAccount });
}
