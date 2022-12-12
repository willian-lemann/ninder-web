import { firebase } from "@config/firebase-admin";
import { NextApiRequest, NextApiResponse } from "next";

export function withAuth(handler: Function) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ error: "Not authenticated. No Auth header" });
    }

    let decodedToken;

    try {
      decodedToken = await firebase.auth().verifyIdToken(token);

      if (!decodedToken || !decodedToken.uid)
        return res.status(401).end("Not authenticated");
      req.userId = decodedToken.uid;
    } catch (error) {
      console.log(error.errorInfo);
      const errorCode = error.errorInfo.code;
      error.status = 401;
      if (errorCode === "auth/internal-error") {
        error.status = 500;
      }
      //TODO handlle firebase admin errors in more detail
      return res.status(error.status).json({ error: errorCode });
    }

    return handler(req, res);
  };
}
