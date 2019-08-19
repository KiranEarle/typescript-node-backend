"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_session_1 = __importDefault(require("express-session"));
const ioredis_1 = __importDefault(require("ioredis"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const redisUrl = process.env.REDIS_URL || '127.0.0.1';
const redisPort = process.env.REDIS_PORT || 6379;
const redisNode = { port: redisPort, host: redisUrl };
const redisClient = new ioredis_1.default(Object.assign({}, redisNode, { url: redisUrl }));
exports.redisClient = redisClient;
const RedisStore = connect_redis_1.default(express_session_1.default);
console.info('Redis details. ', redisUrl, redisPort);
redisClient.on('connect', () => console.info('Connected to Redis.'));
redisClient.on('error', (err, data) => console.info('An error occurred with Redis. ', err, data));
const redisOptions = {
    client: redisClient,
    host: redisUrl,
    port: redisPort,
    logErrors: true
};
const session = express_session_1.default({
    store: new RedisStore(redisOptions),
    secret: 'barrington',
    saveUninitialized: false,
    resave: false,
    cookie: {
        path: '/',
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000 // 1 day - hrs, mins, secs, millisecs
    }
});
exports.default = session;
//# sourceMappingURL=sessionStore.js.map