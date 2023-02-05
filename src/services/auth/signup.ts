import { prisma } from "@config/prisma";
import { JWT_OPTIONS, SECRET } from "@constants/auth/jwt";
import { SignUpCredencials } from "@dtos/login/SignUpCredencials";
import { createApiResponse } from "@utils/createApiResponse";
import jwt from "jsonwebtoken";
import { createUser } from "src/factories/create-user";
import { ResponseType } from "./types";

export async function signupService(data: SignUpCredencials) {
  console.log(data, "squii");
  // TODO: checar se eu ja tenho usuario cadastrado
  const alreadyHasAccount = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (alreadyHasAccount) {
    return createApiResponse<ResponseType>({
      error: { message: "This user is already registered. Try to login." },
      success: false,
    });
  }
  // TODO: Se nao tiver eu crio um, e dps gero um token com as informacoes dele

  const createdAccount = await prisma.user.create({ data });

  const payload = {
    email: createdAccount.email,
    sub: createdAccount.id,
  };

  const token = jwt.sign(payload, SECRET, JWT_OPTIONS);

  const user = createUser(createdAccount);

  return createApiResponse<ResponseType>({
    result: { token, user },
  });
}
