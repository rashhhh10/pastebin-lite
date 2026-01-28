import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || 'https://fake-url.com',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || 'fake-token',
});

export { redis };