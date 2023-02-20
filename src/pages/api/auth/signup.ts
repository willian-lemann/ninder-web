import { JWT_OPTIONS, SECRET } from "@constants/auth/jwt";
import { createApiResponse, ResponseAuthType } from "@utils/createApiResponse";
import { NextApiRequest, NextApiResponse } from "next";
import { createUser } from "src/factories/create-user";

import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";
import { prisma } from "@config/prisma";

import { SignUpCredencials } from "@dtos/login/SignUpCredencials";
import { storage } from "@config/firebase";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "POST") {
    const data = request.body as SignUpCredencials;

    console.log(data.avatar);
    const alreadyHasAccount = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (alreadyHasAccount) {
      return response.status(400).json(
        createApiResponse<ResponseAuthType>({
          error: { message: "This user is already registered. Try to login." },
          success: false,
        })
      );
    }

    const hashPassword = await bcrypt.hash(data.password, 16);

    const createdAccount = await prisma.user.create({
      data: { ...data, password: hashPassword },
    });

    const payload = {
      email: createdAccount.email,
      sub: createdAccount.id,
    };

    const token = jwt.sign(payload, SECRET, JWT_OPTIONS);

    const user = createUser(createdAccount);

    return response.status(201).json(
      createApiResponse<ResponseAuthType>({
        result: { token, user },
      })
    );
  }
}
