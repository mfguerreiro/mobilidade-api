import redis from 'redis';
import { promisify } from 'util';
import retryStrategy from './retry';

import env from 'dotenv';
env.config();

const redisHost =
  process.env.REDIS_HOST ||
  'redis-14781.c279.us-central1-1.gce.cloud.redislabs.com';
const redisPort = process.env.REDIS_PORT || '14781';
const redisPassword = process.env.REDIS_PASSWORD || null;

// Prod
const client = redis.createClient({
  host: redisHost,
  port: redisPort,
  password: redisPassword,
  no_ready_check: true,
  retry_strategy: retryStrategy(),
});

// Disable client's AUTH command.
client['auth'] = null;

client.on('error', (err) => {
  console.log('Error do redis: ', err);
});

client.on('ready', () => {
  console.log('Redis is ready');
});

client.on('connect', () => {
  console.log('Redis is connected');
});

client.on('reconnecting', function (o) {
  console.log('Redis client reconnecting', o.attempt, o.delay);
});

//debug
client.on('message', function (channel, key) {
  console.log('message', key, channel);
});
//debug

export const setAsync = promisify(client.set).bind(client);
export const getAsync = promisify(client.get).bind(client);
export const delAsync = promisify(client.del).bind(client);
export const flushCache = function () {
  client.flushall(function (err, succeeded) {
    console.info(succeeded);
    console.error(err);
  });
  client.flushdb(function (err, succeeded) {
    console.info(succeeded);
    console.error(err);
  });
};
