import { prisma } from "@config/prisma";
import { createApiResponse } from "@utils/createApiResponse";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const userId = request.headers.userid as string;

  const user = await prisma.user.findUnique({ where: { id: userId } });

  return response.status(200).json(createApiResponse({ result: user }));
}
