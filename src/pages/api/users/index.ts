import { NextApiRequest, NextApiResponse } from "next";
import { firebase } from "@config/firebase-admin";
import { getDistanceBetweenTwoCoords } from "@utils/getDistanceBetweenTwoCoords";
import { User } from "@data/entities/user";

import { withAuth } from "@utils/withAuth";

type Methods = "GET" | "POST";
type Request = { userId?: string } & NextApiRequest;

const controller = {
  GET: async (req: Request, res: NextApiResponse) => {
    const userId = req.userId as string;

    const { docs } = await firebase
      .firestore()
      .collection("users")
      .where("id", "!=", userId)
      .get();

    const users = docs.map((doc) => ({ ...doc.data(), id: doc.id })) as User[];

    const doc = await firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .get();

    const currentUser = { ...doc.data(), id: doc.id } as User;

    const filteredUsersByDistance = users.filter((user) => {
      const distance = getDistanceBetweenTwoCoords({
        sourceLocation: currentUser.location,
        targetLocation: user.location,
      });

      if (Math.floor(Number(distance)) < 10) {
        return {
          ...user,
        };
      }
    });

    return res.json(filteredUsersByDistance);
  },

  POST: async (req: NextApiRequest, res: NextApiResponse) => {
    return res.json("ok");
  },
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  // return controller[req.method as Methods](req, res);
};

export default withAuth(handler);
