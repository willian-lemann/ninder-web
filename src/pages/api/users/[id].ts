import { getByIdUseCase, updateUseCase } from "@data/useCases/user";
import { createApiResponse } from "@utils/createApiResponse";
import { NextApiRequest, NextApiResponse } from "next";

type Methods = "GET" | "PUT" | "DELETE";

type Request = { userId?: string } & NextApiRequest;

const controller = {
  GET: async (req: Request, res: NextApiResponse) => {
    const id = req.query.id as string;

    if (!id) {
      return res.status(404).json(
        createApiResponse({
          success: false,
          error: { message: "Not found. No id provided." },
        })
      );
    }

    const user = await getByIdUseCase(id);

    if (!user) {
      return res.status(404).json(
        createApiResponse({
          success: false,
          error: {
            message: "User not found.",
          },
        })
      );
    }

    return res.json(user);
  },

  PUT: async (req: Request, res: NextApiResponse) => {
    const id = req.query.id as string;
    const data = req.body;

    if (!id) {
      return res.status(404).json(
        createApiResponse({
          success: false,
          error: { message: "Not found. No id provided." },
        })
      );
    }

    const updatedUser = await updateUseCase(id, data);

    return res
      .status(201)
      .json(createApiResponse<string>({ result: updatedUser.id }));
  },

  DELETE: async (req: Request, res: NextApiResponse) => {},
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  return controller[req.method as Methods](req, res);
};

export default handler;
