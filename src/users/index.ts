import { Router } from "express";
import multer from "multer";

import getUser from "./get-user";
import authenticate from "../auth/services/authenticate";
import putUser from "./put-user";
import putUserProfile from "./put-user-profile";
import validateUser from "./services/validate-user";

const upload = multer({ dest: "images/" });
const usersRouter = Router();

usersRouter.get("/:user_id", authenticate, validateUser, getUser);
usersRouter.put("/:user_id", authenticate, validateUser, putUser);

/*
  Ideally, we would want to upload to S3 directly using a pre-signed URL.
  So a POST route to generate a pre-signed URL, uploading the image to the URL,
  and then sending the URL into the PUT /users/:user_id and updating the user profile image.
  We can also reverse proxy an Nginx server to the S3 bucket and update the URL accordingly.
  For now, uploading directly to the Node.js server and returning the path of the upload location.
*/
usersRouter.post(
  "/:user_id/profile",
  authenticate,
  validateUser,
  upload.single("profile_image"),
  putUserProfile
);

export default usersRouter;
