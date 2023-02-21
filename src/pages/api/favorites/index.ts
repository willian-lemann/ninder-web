import { prisma } from "@config/prisma";
import { createApiResponse } from "@utils/createApiResponse";
import { exclude } from "@utils/exclude";
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

router.get(async (request, response) => {
  const userId = request.headers.userid as string;

  const favorites = await prisma.favorite.findMany({
    where: { userId },
    include: {
      user: true,
      favoritedUser: true,
    },
  });

  favorites.forEach((favorite) => {
    exclude(favorite, ["favoritedUserId", "user", "userId"]);
  });

  const mappedFavorites = favorites.map((favorite) => ({
    user: favorite.favoritedUser,
  }));

  return response
    .status(200)
    .json(createApiResponse({ result: mappedFavorites }));
});

export default router;
