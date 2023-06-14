import { Filter, getKnexInstance } from "../../utils/db";

const COUNTRIES_TABLE = "countries";

export async function getCountriesInDB(
  filters: Filter[] = [],
  columns: string | string[] = "*"
) {
  const knex = getKnexInstance();
  let query = knex(COUNTRIES_TABLE);

  for (const filter of filters) {
    if (filter.operation === "eq") {
      query = query.where(filter.field, filter.value);
    }
  }

  const countries = await query.select(columns);

  return countries;
}
