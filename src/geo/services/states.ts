import { Filter, getKnexInstance } from "../../utils/db";

const STATES_TABLE = "states";

export async function getStatesInDB(
  filters: Filter[] = [],
  columns: string | string[] = "*"
) {
  const knex = getKnexInstance();
  let query = knex(STATES_TABLE);

  for (const filter of filters) {
    if (filter.operation === "eq") {
      query = query.where(filter.field, filter.value);
    }
  }

  const states = await query.select(columns);

  return states;
}
