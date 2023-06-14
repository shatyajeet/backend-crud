import { Request, Response } from "express";

import { getUsers, updateUser } from "./services/user";
import STATUS_CODES from "../utils/status-codes";

export default async function putUser(req: Request, res: Response) {
  const { body, params } = req;

  const { user_id } = params;
  const { firstName, lastName, cityId } = body;
  const userIdBin = parseInt(user_id, 10);

  if (firstName.length > 40 || lastName.length > 40) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      status: "failure",
      msg: "First name or last name is longer than 40 characters",
    });
  }

  const insertObject = {
    first_name: firstName,
    last_name: lastName,
    city_id: cityId,
  };

  await updateUser(userIdBin, insertObject);
  const users = await getUsers([
    { field: "id", operation: "eq", value: userIdBin },
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
