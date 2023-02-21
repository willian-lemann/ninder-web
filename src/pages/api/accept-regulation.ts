import { prisma } from "@config/prisma";
import { createApiResponse } from "@utils/createApiResponse";
import { NextApiRequest, NextApiResponse } from "next";

import nextConnect from "next-connect";

const router = nextConnect<NextApiRequest, NextApiResponse>({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },

  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

export default router.put(async (request, response) => {
  const userId = request.headers.userid as string;

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { hasConfirmedRegulation: true },
  });

  return response
    .status(200)
    .json(createApiResponse({ result: updatedUser.id }));
});
