import { Router } from "express";

import login from "./login";
import validateOtp from "./validate-otp";

const authRouter = Router();

authRouter.post("/login", login);
authRouter.post("/validate-otp", validateOtp);

export default authRouter;
