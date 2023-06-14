import { Request, Response } from "express";
import otpGenerator from "otp-generator";

import { redisSet } from "../utils/redis";
import STATUS_CODES from "../utils/status-codes";
import { isEmailValid } from "../utils/email";

export default async function login(req: Request, res: Response) {
  const { email } = req.body;

  if (!isEmailValid(email)) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      status: "failure",
      msg: "Invalid email",
    });
  }

  const otp = otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  console.log(`OTP for email ${email}: ${otp}`);

  await redisSet(`otp_${email}`, JSON.stringify({ otp, tries: 3 }), 15 * 60);

  return res.status(STATUS_CODES.OK).json({
    status: "success",
    msg: "OTP sent to email",
  });
}
