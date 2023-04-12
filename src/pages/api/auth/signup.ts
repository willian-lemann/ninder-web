import { prisma } from "@/server/db";

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const {
      id,
      first_name,
      last_name,
      email_addresses,
      primary_email_address_id,
    } = req.body.data;

    const email = email_addresses?.find(
      (email: { id: string }) => email.id === primary_email_address_id
    )?.email_address;

    const name = `${first_name} ${last_name}`;

    await prisma.user.create({
      data: {
        email,
        name,
        userId: id,
      },
    });
  }
}
