import { Request, Response } from "express";

import STATUS_CODES from "../utils/status-codes";

export default async function putUserProfile(req: Request, res: Response) {
  const { file } = req;

  if (!file) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      status: "failure",
      msg: "No file found",
    });
  }

  const validMimeTypes = ["image/png", "image/jpeg"];
  const { mimetype, path, size } = file;
  if (size > 5 * 1024 * 1024) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      status: "failure",
      msg: "File size exceeds the 5MB limit",
    });
  }

  if (!validMimeTypes.includes(mimetype)) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      status: "failure",
      msg: "File types `png` and `jpeg` allowed only",
    });
  }

  return res.status(STATUS_CODES.OK).json({
    status: "success",
    data: {
      profile_image_url: path,
    },
  });
}
