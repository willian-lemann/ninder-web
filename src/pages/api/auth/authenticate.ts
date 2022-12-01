import { firebase } from "@config/firebase-admin";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
}
