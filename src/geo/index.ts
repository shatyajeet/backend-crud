import { Router } from "express";

import getCities from "./get-cities";
import getStates from "./get-states";
import getCountries from "./get-countries";

const geoRouter = Router();

geoRouter.get("/cities", getCities);
geoRouter.get("/states", getStates);
geoRouter.get("/countries", getCountries);

export default geoRouter;
