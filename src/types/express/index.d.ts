import { DecodedUser } from "../../utils/token";

export {};

/*
  https://blog.logrocket.com/extend-express-request-object-typescript/
  Extending Request interface to include req.user when authenticating.
*/
declare global {
  namespace Express {
    export interface Request {
      user: DecodedUser;
    }
  }
}
