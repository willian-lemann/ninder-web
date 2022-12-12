import { firebase } from "@config/firebase-admin";
import { NextApiRequest, NextApiResponse } from "next";

type Methods = "POST";

const controller = {
  POST: async (req: NextApiRequest, res: NextApiResponse) => {
    const { email } = req.body;

    const user = await firebase.auth().getUserByEmail(email);

    const token = await firebase.auth().createCustomToken(user.uid);

    const userDoc = await firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .get();

    if (!userDoc) return res.status(404).json({ message: "user not found." });

    const registeredUser = { ...userDoc.data(), id: userDoc.id };

    return res.json({
      user: registeredUser,
      token,
    });
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return controller[req.method as Methods](req, res);
}
