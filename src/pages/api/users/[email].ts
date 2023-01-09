import { User } from "@data/entities";
import { getByEmailUseCase } from "@data/useCases/user";
import { createApiResponse } from "@utils/createApiResponse";
import { NextApiRequest, NextApiResponse } from "next";

type Methods = "GET";
type Request = { userId?: string } & NextApiRequest;

const controller = {
  GET: async (req: Request, res: NextApiResponse) => {
    const email = req.query.email as string;

    if (!email) {
      return res.status(404).json(
        createApiResponse({
          success: false,
          error: {
            message: "No email provided in params",
          },
        })
      );
    }

    const user = await getByEmailUseCase(email);

    if (!user) {
      return res.status(404).json(
        createApiResponse({
          success: false,
          error: { message: "User Not found." },
        })
      );
    }

    return res.status(201).json(createApiResponse<User>({ result: user }));
  },
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  return controller[req.method as Methods](req, res);
};

export default handler;
