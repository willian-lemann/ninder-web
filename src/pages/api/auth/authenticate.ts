import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { getByEmailUseCase } from "@data/useCases/user";
import { createApiResponse } from "@utils/createApiResponse";
import { NextApiRequest, NextApiResponse } from "next";
import { exclude } from "@utils/exclude";
import { User } from "@data/entities";

type Methods = "POST";

async function validateUser(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;

  const user = await getByEmailUseCase(email);

  if (!user) {
    return res.status(404).json(
      createApiResponse({
        success: false,
        error: {
          message: `User ${email} not found.`,
        },
      })
    );
  }

  const isSamePassword = await bcrypt.compare(password, user.password);

  if (!isSamePassword) {
    return res.status(404).json(
      createApiResponse({
        success: false,
        error: { message: "User/Password is incorrect" },
      })
    );
  }

  exclude(user, ["password"]);

  return user;
}

const controller = {
  POST: async (req: NextApiRequest, res: NextApiResponse) => {
    const validatedUser = await validateUser(req, res);

    const user = validateUser as User;

    const payload = { email: req.body.email, userId: user.id };

    const token = jwt.sign(payload, "123", { expiresIn: "1d" });

    return res.status(200).json(createApiResponse({ result: { token, user } }));
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return controller[req.method as Methods](req, res);
}
