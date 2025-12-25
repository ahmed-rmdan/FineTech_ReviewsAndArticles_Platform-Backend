import { createClient } from 'redis';

export async function connectToRedis() {
  try {
    const client = createClient({
      socket: {
        host: process.env.REDIS_HOST || 'localhost',
        port: 6379
      }
    });
    client.on('error', (err) => console.log('Redis Client Error', err));
    await client.connect(); 
    console.log('Connected to Redis!');
    return client;
  } catch (e) {
    console.error('Connection failed', e);
    
  }
}