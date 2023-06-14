import { Request, Response } from "express";

import STATUS_CODES from "../utils/status-codes";
import { getUsers } from "./services/user";

export default async function getUser(req: Request, res: Response) {
  const { user_id } = req.params;

  const users = await getUsers([
    { field: "id", operation: "eq", value: parseInt(user_id, 10) },
  ]);

  if (users.length > 0) {
    return res.status(STATUS_CODES.OK).json({
      status: "success",
      data: {
        user: users[0],
      },
    });
  }

  return res.status(STATUS_CODES.NOT_FOUND).json({
    status: "failure",
    msg: "User not found",
  });
}
