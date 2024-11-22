import Redis from 'ioredis'
import dotenv from 'dotenv'

dotenv.config()

const host = process.env.REDIS_HOST || ''
const port = parseInt(process.env.REDIS_PORT || '', 10)
const password = process.env.REDIS_PASSWORD || ''

if (!host || !port || !password) {
  throw new Error(
    'REDIS_HOST, REDIS_PORT, REDIS_PASSWORD environment variables are not set'
  )
}

const redis = new Redis({
  host,
  port,
  password,
  maxRetriesPerRequest: null,
})

redis.on('ready', () => {
  console.log('Redis is ready')
})

redis.on('reconnecting', () => {
  console.log('Redis reconnecting')
})

redis.on('connect', () => {
  console.log('Redis connected')
})

redis.on('reconnect', () => {
  console.log('Redis reconnected')
})

redis.on('error', (err) => {
  console.error('Redis error', err)
})

redis.on('end', () => {
  console.log('Redis end')
})

export { redis }
