import { getCountriesUseCase } from "@data/useCases/getCountriesUseCase";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { json } from "stream/consumers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const countries = await getCountriesUseCase();

  return res.json(countries);
}
