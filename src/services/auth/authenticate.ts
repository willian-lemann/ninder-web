import { prisma } from "@config/prisma";
import jwt from "jsonwebtoken";
import { createApiResponse } from "@utils/createApiResponse";
import { JWT_OPTIONS, SECRET } from "@constants/auth/jwt";

import { createUser } from "src/factories/create-user";
import { ResponseType } from "./types";

export async function authenticateService(email: string, password: string) {
  // TODO: checar se tem usuario no banco
  const userRegister = await prisma.user.findUnique({ where: { email } });

  if (!userRegister) {
    return createApiResponse<ResponseType>({
      success: false,
      error: {
        message: "User is not registered in database. Sign up!",
      },
    });
  }

  const payload = {
    email,
    sub: userRegister.id,
  };

  const token = jwt.sign(payload, SECRET, JWT_OPTIONS);

  const user = createUser(userRegister);

  return createApiResponse<ResponseType>({
    result: {
      token,
      user,
    },
  });
  // TODO: se tiver, eu gerar um token com as info do usuario
}
