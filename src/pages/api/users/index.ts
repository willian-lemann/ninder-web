import { prisma } from "@config/prisma";
import { createApiResponse } from "@utils/createApiResponse";

import { User } from "@data/models/user";
import { exclude } from "@utils/exclude";
import { getDistanceAway } from "@utils/getDistanceAway";

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

export default router.get(async (request, response) => {
  const userId = request.headers.userid as string;

  const users = await prisma.user.findMany({
    where: {
      NOT: { id: userId },
    },
  });

  users.forEach((user) => {
    exclude(user, ["password"]);
  });

  const currentUser = await prisma.user.findUnique({ where: { id: userId } });

  users.forEach((user) => {
    return {
      ...user,
      distanceAway: getDistanceAway({
        sourceLocation: {
          latitude: currentUser?.latitude as number,
          longitude: currentUser?.longitude as number,
        },

        targetLocation: {
          latitude: user.latitude as number,
          longitude: user.longitude as number,
        },
      }),
    };
  });

  return response.status(200).json(
    createApiResponse<User[]>({
      result: users,
    })
  );
});
