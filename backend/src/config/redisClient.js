import Redis from "ioredis";

const redis = new Redis(getEnv("REDIS_URL"));

export default redis;
