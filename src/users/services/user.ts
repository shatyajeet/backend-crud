import { Filter, getKnexInstance } from "../../utils/db";

const USERS_TABLE = "users";
interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  city_id: number;
  profile_image: string;
}

interface UserInsert {
  email?: string;
  first_name?: string;
  last_name?: string;
  city_id?: number;
  profile_image?: string;
}

const returnFields = ["id", "email", "first_name", "last_name"];

// Create a generic get users query
export async function getUsers(
  filters: Filter[] = [],
  columns: string | string[] = "*"
) {
  const knex = getKnexInstance();
  let users_query = knex<User>(USERS_TABLE);

  for (const filter of filters) {
    if (filter.operation === "eq") {
      users_query = users_query.where(filter.field, filter.value);
    }
    // more filters like 'in', 'gte', etc can be applied here
  }

  const users = await users_query.select(columns);

  return users;
}

export async function insertUser(user: UserInsert) {
  const knex = getKnexInstance();
  const record = await knex<User>(USERS_TABLE)
    .insert(user)
    .returning(returnFields);

  return record;
}

export async function updateUser(userId: number, user: UserInsert) {
  const knex = getKnexInstance();
  const recordCount = await knex<User>(USERS_TABLE)
    .where("id", userId)
    .update(user);

  return recordCount;
}
