import express, { Express } from "express";
import dotenv from "dotenv";
import logger from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

dotenv.config();

import auth from "./auth";
import geo from "./geo";
import users from "./users";
import { initRedis } from "./utils/redis";
import { initKnex } from "./utils/db";

// Using redis to store the OTP and the number of retries.
initRedis();
// Using knex to connect with the database instead of a full-blown ORM to reduce SQL overhead
initKnex();

const app: Express = express();
const port = parseInt(process.env.PORT ?? "3000", 10);

app.use(logger("combined"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", auth); // The authentication routes
app.use("/geo", geo); // The countries, states and cities routes
app.use("/users", users); // The users routes for CRUD

app.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});
