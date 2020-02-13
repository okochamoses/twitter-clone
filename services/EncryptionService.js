const logger = require("../config/logger");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

class EncryptionService {
  constructor(salt = 10) {
    this.salt = salt;
  }
  async hash(password) {
    try {
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      return hashedPassword;
    } catch (e) {
      logger.error(`Error hashing password: ${e.message}`);
      return null;
    }
  }
}

module.exports = EncryptionService;
