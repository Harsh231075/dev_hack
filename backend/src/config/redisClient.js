import Redis from "ioredis";
import { getEnv } from "../utils/getEnv.js"

const redisPub = new Redis(getEnv("REDIS_URL"));  // For publishing messages
const redisSub = new Redis(getEnv("REDIS_URL"));  // For subscribing
const redisCache = new Redis(getEnv("REDIS_URL"));  // Cache client

export { redisPub, redisSub, redisCache };
