import { createClient } from 'redis';

export async function connectToRedis() {
  try {
    const client = createClient();
    client.on('error', (err) => console.log('Redis Client Error', err));
    await client.connect(); 
    console.log('Connected to Redis!');
    return client;
  } catch (e) {
    console.error('Connection failed', e);
    
  }
}