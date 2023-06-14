import { NextFunction, Request, Response } from "express";

import STATUS_CODES from "../../utils/status-codes";

export default function validateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { params, user } = req;
  const { user_id } = params;

  if (parseInt(user_id, 10) !== user.id) {
    return res.status(STATUS_CODES.FORBIDDEN).json({
      status: "failure",
      msg: "Access denied",
    });
  }

  next();
}
