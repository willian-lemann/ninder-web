import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { json } from "stream/consumers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await axios("https://restcountries.com/v3.1/all");
  return res.json(response.data);
}
