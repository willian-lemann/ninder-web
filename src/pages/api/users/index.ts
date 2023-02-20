import nextConnect from "next-connect";

import { prisma } from "@config/prisma";
import { createApiResponse } from "@utils/createApiResponse";
import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@data/models/user";
import { exclude } from "@utils/exclude";
import { getDistanceAway } from "@utils/getDistanceAway";

export default nextConnect<NextApiRequest, NextApiResponse>().get(
  async (request, response) => {
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
      createApiResponse({
        result: users,
      })
    );
  }
);
