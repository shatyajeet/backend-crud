import { NextFunction, Request, Response } from "express";

import { decodeToken } from "../../utils/token";
import STATUS_CODES from "../../utils/status-codes";

export default function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.cookies) {
    const { token } = req.cookies;

    if (!token) {
      return res.status(STATUS_CODES.FORBIDDEN).json({
        status: "failure",
        msg: "No authentication mechanism found",
      });
    }

    const user = decodeToken(token);
    const { exp } = user;

    if (exp * 1000 < Date.now()) {
      return res.status(STATUS_CODES.UNAUTHORIZED).json({
        status: "failure",
        msg: "Authentication expired. Login again",
      });
    }

    req.user = user;
  } else {
    return res.status(STATUS_CODES.FORBIDDEN).json({
      status: "failure",
      msg: "Access Denied",
    });
  }

  next();
}
