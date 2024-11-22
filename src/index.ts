import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { redis } from './lib/redis'
import './lib/redisSubscriber'

const app = new Hono()

setInterval(() => {
  redis.publish('channel-name', JSON.stringify(Date.now()))
}, 1000)

app.get('/', (c) => {
  redis.publish('channel-name', JSON.stringify(Date.now()))

  return c.text('Hello Hono!')
})

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port,
})
