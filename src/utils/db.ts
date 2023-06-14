import knex, { Knex } from "knex";

const KNEX_CONFIG: Knex.Config = {
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT ?? "3306", 10),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
};

let knexInstance: Knex;

export type Filter = {
  field: string;
  operation: "eq" | "not" | "gte" | "lte" | "gt" | "lt";
  value: string | number;
};

export function initKnex() {
  knexInstance = knex(KNEX_CONFIG);
}

export function getKnexInstance() {
  return knexInstance;
}
