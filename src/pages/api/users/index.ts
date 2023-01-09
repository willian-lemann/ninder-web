import { User } from "@data/entities";
import { getAllUseCase } from "@data/useCases/user";
import { createUseCase } from "@data/useCases/user/create-usecase";
import { createApiResponse } from "@utils/createApiResponse";
import { NextApiRequest, NextApiResponse } from "next";

type Methods = "GET" | "POST";
type Request = { userId?: string } & NextApiRequest;

const controller = {
  GET: async (req: Request, res: NextApiResponse) => {
    const userId = req.userId as string;

    const users = await getAllUseCase(userId);

    return res.json(createApiResponse({ result: users }));
  },

  POST: async (req: NextApiRequest, res: NextApiResponse) => {
    const data = req.body;

    const createdUser = await createUseCase(data);

    return res.status(202).json(createApiResponse({ result: createdUser }));
  },
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  return controller[req.method as Methods](req, res);
};

export default handler;
