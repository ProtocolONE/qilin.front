const Redis = require('ioredis');
const { Store } = require('koa-session2');

class RedisStore extends Store {
  constructor(port, host, maxAge, keyPrefix) {
    super();
    this.keyPrefix = keyPrefix || 'SESSION';
    this.maxAge = maxAge || 900; // 15 minutes, in seconds
    this.redis = new Redis(port, host);
  }

  async get(sid, ctx) {
    const data = await this.redis.get(`${this.keyPrefix}:${sid}`);
    return JSON.parse(data);
  }

  async set(session, { sid = this.getID(24), maxAge = this.maxAge } = {}, ctx) {
    try {
      // Use redis set EX to automatically drop expired sessions
      await this.redis.set(`${this.keyPrefix}:${sid}`, JSON.stringify(session), 'EX', maxAge);
    } catch (e) {
    }
    return sid;
  }

  async destroy(sid, ctx) {
    return this.redis.del(`${this.keyPrefix}:${sid}`);
  }
}

module.exports = RedisStore;
