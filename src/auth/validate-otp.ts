import { Request, Response } from "express";

import { getUsers, insertUser } from "../users/services/user";
import { redisDelete, redisGet, redisSet } from "../utils/redis";
import STATUS_CODES from "../utils/status-codes";
import { encodeToken } from "../utils/token";
import { isEmailValid } from "../utils/email";
import { checkOTPRequest } from "./services/otp";

export default async function validateOtp(req: Request, res: Response) {
  const { email, otp } = req.body;
  const otpEntered = "" + otp;

  if (!isEmailValid(email)) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      status: "failure",
      msg: "Invalid email",
    });
  }

  const OTP_KEY = `otp_${email}`;

  const otpRedisVal = await redisGet(OTP_KEY);
  const { otp: otpForEmail, tries } = JSON.parse(otpRedisVal ?? "{}");

  // Check if the validate-otp request is valid
  const otpRequestCheck = checkOTPRequest(otpForEmail, email, tries);

  if (!otpRequestCheck.valid) {
    return res.status(otpRequestCheck.statusCode).json({
      status: "failure",
      msg: otpRequestCheck.msg,
    });
  }

  // Reduce the number of retries on invalid OTP
  if (otpForEmail !== otpEntered) {
    const newTries = tries - 1;
    if (newTries === 0) {
      await redisDelete(OTP_KEY);
    } else {
      await redisSet(
        OTP_KEY,
        JSON.stringify({ otp, tries: newTries }),
        15 * 60
      );
    }

    return res.status(STATUS_CODES.UNAUTHORIZED).json({
      status: "failure",
      msg: "Invalid OTP",
      triesRemaining: newTries,
    });
  }

  // Check if user exists, else create a new user
  const users = await getUsers(
    [{ field: "email", operation: "eq", value: email }],
    ["id", "first_name", "last_name", "email"]
  );

  let user;

  if (users.length === 0) {
    const userInsertObject = {
      email,
      first_name: "",
      last_name: "",
      profile_image: "",
    };

    user = await insertUser(userInsertObject);
  } else {
    user = users[0];
  }

  await redisDelete(OTP_KEY);

  // Create JWT for the user with the partial user object for 24h
  const token = encodeToken(user);

  const tokenExpiry = new Date();
  tokenExpiry.setTime(tokenExpiry.getTime() + 24 * 60 * 60 * 1000); // token expires in 24h

  // Set the JWT as a cookie
  res.cookie("token", token, {
    expires: tokenExpiry,
    secure: true,
    httpOnly: true,
  });

  return res.status(STATUS_CODES.OK).json({
    status: "success",
    user,
  });
}
