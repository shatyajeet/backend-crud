import { Request, Response } from "express";

import { Filter } from "../utils/db";
import STATUS_CODES from "../utils/status-codes";
import { getStatesInDB } from "./services/states";

export default async function getStates(req: Request, res: Response) {
  const { countryId } = req.query;

  const filters: Filter[] = [];

  if (countryId) {
    filters.push({
      field: "country_id",
      operation: "eq",
      value: parseInt(countryId as string),
    });
  }

  const states = await getStatesInDB(filters);

  return res.status(STATUS_CODES.OK).json({
    status: "success",
    data: {
      states,
    },
  });
}
