import { prisma } from "@config/prisma";
import { createApiResponse } from "@utils/createApiResponse";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const userId = request.headers.userid as string;

  if (request.method === "POST") {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { hasConfirmedRegulation: true },
    });

    return response
      .status(200)
      .json(createApiResponse({ result: updatedUser.id }));
  }
}
