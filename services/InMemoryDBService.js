const { jwtTimeout } = require("../config/configurationKeys");
const client = require("../config/inMemoryConfig");
const { promisify } = require("util");
const logger = require("../config/logger");

class InMemoryDBService {
  constructor() {
    this.client = client;
    this.getAsync = promisify(client.get).bind(client);
  }

  set(key, value) {
    this.client.set(key, value);
  }

  setWithTimeout(key, value, timeout = jwtTimeout) {
    this.client.set(key, value, "EX", timeout);
  }

  async get(key) {
    try {
      return this.getAsync(key);
    } catch (err) {
      logger.error(`Unable to fetch key of ${key} from redis`, err);
    }
  }
}

module.exports = InMemoryDBService;
