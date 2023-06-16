import STATUS_CODES from "../../utils/status-codes";

export function checkOTPRequest(
  otpForEmail: string,
  email: string,
  tries: number
) {
  const response = {
    valid: true,
    statusCode: STATUS_CODES.OK,
    msg: "",
  };
  if (!otpForEmail) {
    response.valid = false;
    response.msg = `OTP not found for email ${email}. Request OTP again.`;
    response.statusCode = STATUS_CODES.BAD_REQUEST;
  } else if (tries === 0) {
    response.valid = false;
    response.msg = "Exceeded retry limit for OTP. Request OTP again";
    response.statusCode = STATUS_CODES.BAD_REQUEST;
  }

  return response;
}
