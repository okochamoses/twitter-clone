const logger = require("../config/logger");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SALT_ROUNDS = 10;

class EncryptionService {
  constructor(salt = 10) {
    this.salt = salt;
  }
  async hash(plainText) {
    try {
      const hashedPlainText = await bcrypt.hash(plainText, SALT_ROUNDS);
      return hashedPlainText;
    } catch (e) {
      logger.error(`Error hashing plaintext data: ${e.message}`);
      return null;
    }
  }

  async compareHash(plainText, hash) {
    try {
      const isValid = bcrypt.compare(plainText, hash);
      return isValid;
    } catch (e) {
      logger.error(
        `Error comparing encrypted data and plain text: ${e.message}`
      );
      return false;
    }
  }

  signToken(data, secret, options = {}) {
    try {
      return jwt.sign(data, secret, options);
    } catch (e) {
      logger.error(`Error creating token: ${e.message}`);
      return false;
    }
  }
}

module.exports = EncryptionService;
