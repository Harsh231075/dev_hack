import Redis from "ioredis";
import { getEnv } from "../utils/getEnv.js"

const redis = new Redis(getEnv("REDIS_URL"));

export default redis;
