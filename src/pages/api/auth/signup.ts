import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { getByEmailUseCase } from "@data/useCases/user";
import { createApiResponse } from "@utils/createApiResponse";
import { NextApiRequest, NextApiResponse } from "next";
import { exclude } from "@utils/exclude";
import { User } from "@data/entities";

type Methods = "POST";

const controller = {
  POST: async (req: NextApiRequest, res: NextApiResponse) => {
   
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return controller[req.method as Methods](req, res);
}
