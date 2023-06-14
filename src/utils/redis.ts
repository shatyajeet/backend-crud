import { RedisClientType } from "@redis/client";
import { createClient } from "redis";

let redisClient: RedisClientType;

export async function initRedis() {
  const redisUrl = process.env.REDIS_URL;
  redisClient = createClient({
    url: redisUrl,
  });

  redisClient.on("error", (err) => {
    console.log(`Error in Redis: ${err}`);
  });

  await redisClient.connect();
}

export async function redisGet(key: string) {
  return await redisClient.get(key);
}

export async function redisSet(key: string, value: string, ttl: number = -1) {
  await redisClient.set(key, value, {
    EX: ttl,
  });
}

export async function redisDelete(key: string) {
  await redisClient.del(key);
}
