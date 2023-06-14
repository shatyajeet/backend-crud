import { Request, Response } from "express";

import { getCountriesInDB } from "./services/countries";
import STATUS_CODES from "../utils/status-codes";

export default async function getCountries(req: Request, res: Response) {
  const countries = await getCountriesInDB();

  return res.status(STATUS_CODES.OK).json({
    status: "success",
    data: {
      countries,
    },
  });
}
