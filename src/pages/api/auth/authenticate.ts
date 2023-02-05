import { prisma } from "@config/prisma";
import { JWT_OPTIONS, SECRET } from "@constants/auth/jwt";
import { createApiResponse, ResponseAuthType } from "@utils/createApiResponse";
import { NextApiRequest, NextApiResponse } from "next";

import jwt from "jsonwebtoken";
import { createUser } from "src/factories/create-user";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "POST") {
    const data = request.body;

    const userRegister = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!userRegister) {
      return createApiResponse<ResponseAuthType>({
        success: false,
        error: {
          message: "User is not registered in database. Sign up!",
        },
      });
    }

    const payload = {
      email: data.email,
      sub: userRegister.id,
    };

    const token = jwt.sign(payload, SECRET, JWT_OPTIONS);

    const user = createUser(userRegister);

    return response.status(201).json(
      createApiResponse<ResponseAuthType>({
        result: {
          token,
          user,
        },
      })
    );
  }
}
