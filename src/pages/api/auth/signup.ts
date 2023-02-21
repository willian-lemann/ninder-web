import { JWT_OPTIONS, SECRET } from "@constants/auth/jwt";
import { createApiResponse, ResponseAuthType } from "@utils/createApiResponse";

import { createUser } from "src/factories/create-user";

import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";
import { prisma } from "@config/prisma";

import { SignUpCredencials } from "@dtos/login/SignUpCredencials";

import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";

export const router = nextConnect<NextApiRequest, NextApiResponse>({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },

  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

export default router.post(async (request, response) => {
  const data = request.body as SignUpCredencials;

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
});
