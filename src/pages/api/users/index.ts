import { NextApiRequest, NextApiResponse } from "next";
import { firebase } from "@config/firebase-admin";
import { getDistanceBetweenTwoCoords } from "@utils/getDistanceBetweenTwoCoords";
import { User } from "@models/user";

type Methods = "GET" | "POST";

const controller = {
  GET: async (req: NextApiRequest, res: NextApiResponse) => {
    const { docs } = await firebase.firestore().collection("users").get();

    const users = docs.map((doc) => ({ ...doc.data(), id: doc.id })) as User[];

    const filteredUsersByDistance = users.filter((user) => {
      const distance = getDistanceBetweenTwoCoords({
        currentLocation: null,
        targetLocation: null,
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

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return controller[req.method as Methods](req, res);
}
