import { prisma } from "@config/prisma";
import { createApiResponse } from "@utils/createApiResponse";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "GET") {
    const users = await prisma.user.findMany();

    return createApiResponse({ result: users });
  }
}
