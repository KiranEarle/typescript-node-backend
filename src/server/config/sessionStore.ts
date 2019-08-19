import expressSession from 'express-session'
import Redis from 'ioredis'
import store from 'connect-redis'

interface IRedisClient {
  url: string,
  port: number,
  host: string,
  logErrors: boolean
}

const redisUrl = process.env.REDIS_URL || '127.0.0.1'
const redisPort = process.env.REDIS_PORT || 6379
const redisNode = { port: redisPort, host: redisUrl }
const redisClient = new Redis(<IRedisClient>{...redisNode, url: redisUrl})
const RedisStore = store(expressSession)

console.info('Redis details. ', redisUrl, redisPort)

redisClient.on('connect', () => console.info('Connected to Redis.'))
redisClient.on('error', (err, data) => console.info('An error occurred with Redis. ', err, data))


const redisOptions = {
  client: redisClient,
  host: redisUrl,
  port: redisPort,
  logErrors: true
}

const session = expressSession({
  store: new RedisStore(<any>redisOptions),
  secret: 'barrington',
  saveUninitialized: false,
  resave: false,
  cookie: {
    path: '/',
    httpOnly: true,
    secure: false,
    maxAge: 24 * 60 * 60 * 1000 // 1 day - hrs, mins, secs, millisecs
  }
})

export {
  redisClient
}

export default session