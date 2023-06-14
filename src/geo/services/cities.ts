import { Filter, getKnexInstance } from "../../utils/db";

const CITIES_TABLE = "cities";

export async function getCitiesInDB(
  filters: Filter[] = [],
  columns: string | string[] = "*"
) {
  const knex = getKnexInstance();
  let query = knex(CITIES_TABLE);

  for (const filter of filters) {
    if (filter.operation === "eq") {
      query = query.where(filter.field, filter.value);
    }
  }

  const cities = await query.select(columns);

  return cities;
}
