import { DecodedUser } from "../../utils/token";

export {};

declare global {
  namespace Express {
    export interface Request {
      user: DecodedUser;
    }
  }
}
