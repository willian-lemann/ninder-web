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

router.post(async (request, response) => {
  const userId = request.headers.userid as string;
  const favoritedUserId = request.body.favoritedUserId as string;

  const favorited = await prisma.favorite.findFirst({
    where: { userId },
  });

  if (favorited) {
    await prisma.favorite.delete({
      where: { id: favorited.id },
    });

    return response.status(204);
  }

  const createdFavorited = await prisma.favorite.create({
    data: { userId, favoritedUserId },
  });

  return response.status(201).json(
    createApiResponse({
      result: createdFavorited.id,
    })
  );
});

export default router;
