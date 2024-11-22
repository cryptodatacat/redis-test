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

redis.on('error', (err) => {
  console.error('Redis error', err)
})

redis.on('connect', () => {
  console.log('Redis connected')
})

redis.on('reconnect', () => {
  console.log('Redis reconnected')
})

redis.on('reconnecting', () => {
  console.log('Redis reconnecting')
})

redis.on('end', () => {
  console.log('Redis end')
})

redis.subscribe('channel-name', (err, count) => {
  if (err) {
    // Just like other commands, subscribe() can fail for some reasons,
    // ex network issues.
    console.error('Failed to subscribe: %s', err.message)
  } else {
    // `count` represents the number of channels this client are currently subscribed to.
    console.log(
      `Subscribed successfully! This client is currently subscribed to ${count} channels.`
    )
  }
})

redis.on('message', (channel, message) => {
  // console.log(`Received ${message} from ${channel}`)
  console.log('redis time:', Date.now() - parseInt(message))
})
