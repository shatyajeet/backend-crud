import { Request, Response } from "express";

import { getCitiesInDB } from "./services/cities";
import { Filter } from "../utils/db";
import STATUS_CODES from "../utils/status-codes";

export default async function getCities(req: Request, res: Response) {
  const { stateId } = req.query;

  const filters: Filter[] = [];

  if (stateId) {
    filters.push({
      field: "state_id",
      operation: "eq",
      value: parseInt(stateId as string),
    });
  }

  const cities = await getCitiesInDB(filters);

  return res.status(STATUS_CODES.OK).json({
    status: "success",
    data: {
      cities,
    },
  });
}
