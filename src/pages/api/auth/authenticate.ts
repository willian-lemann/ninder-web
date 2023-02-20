import { prisma } from "@config/prisma";
import { JWT_OPTIONS, SECRET } from "@constants/auth/jwt";
import { createApiResponse, ResponseAuthType } from "@utils/createApiResponse";
import { NextApiRequest, NextApiResponse } from "next";

import { SignInCredencials } from "@dtos/login/SignInCredencials";

import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";
import { createUser } from "src/factories/create-user";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "POST") {
    const data = request.body as SignInCredencials;

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

    const isSamePassword = await bcrypt.compare(
      data.password,
      userRegister.password
    );

    if (!isSamePassword) {
      return response.status(400).json(
        createApiResponse({
          success: false,
          error: {
            message: "Email or Password is invalid. Try again.",
          },
        })
      );
    }

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
