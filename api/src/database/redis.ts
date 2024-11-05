import { createClient } from 'redis';

export const redisClient = createClient({
  password: process.env.REDIS_PASSWORD as string,
  socket: {
    host: process.env.REDIS_HOST as string,
    port: 18224
  }
});

redisClient.on("connect", () => {
  console.log("Redis connected with success.");
});

redisClient.on("error", (err) => {
  console.log(`Error to connect to Redis: ${err}`);
});

redisClient.connect();