import { JWT_OPTIONS, SECRET } from "@constants/auth/jwt";
import { createApiResponse, ResponseAuthType } from "@utils/createApiResponse";
import { NextApiRequest, NextApiResponse } from "next";
import { createUser } from "src/factories/create-user";

import jwt from "jsonwebtoken";
import { prisma } from "@config/prisma";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "POST") {
    const data = request.body;

    const alreadyHasAccount = await prisma.user.findUnique({
      where: { email: data.email },
    });

    console.log(alreadyHasAccount);

    if (alreadyHasAccount) {
      return createApiResponse<ResponseAuthType>({
        error: { message: "This user is already registered. Try to login." },
        success: false,
      });
    }

    const createdAccount = await prisma.user.create({ data });

    const payload = {
      email: createdAccount.email,
      sub: createdAccount.id,
    };

    const token = jwt.sign(payload, SECRET, JWT_OPTIONS);

    const user = createUser(createdAccount);

    console.log("passou criou user", user);

    return response.status(201).json(
      createApiResponse<ResponseAuthType>({
        result: { token, user },
      })
    );
  }
}
