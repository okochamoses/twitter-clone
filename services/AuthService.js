const logger = require("../config/logger");
const ServiceResponse = require("./responses/ServiceResponse");
const { jwtSecret, jwtTimeout } = require("../config/configurationKeys");
const { code, message } = require("./responses/ResponseObjects");

class AuthService {
  constructor({ userRepository, encryptionService }) {
    this.userRepository = userRepository;
    this.encryptionService = encryptionService;
  }

  async register(user) {
    try {
      const { username, fullName, email, password, phoneNumber } = user;
      // Validate unique constraints in user model
      const isInvalidResponse = await this.isUniqueCredentialsInvalid(
        username,
        email,
        phoneNumber
      );

      if (isInvalidResponse.code === 10) {
        return isInvalidResponse;
      }

      // Generate hash
      const hashedPassword = await this.encryptionService.hash(password);
      if (hashedPassword === null) {
        throw new Error("Error generating password hash");
      }

      // Save user
      const createdUser = await this.userRepository.create({
        fullName,
        username,
        email,
        phoneNumber,
        password: hashedPassword
      });
      console.log(createdUser);
      return new ServiceResponse(
        code.SUCCESS,
        "User created successfully",
        createdUser
      );
    } catch (e) {
      logger.error(`Error registering user: ${e.message}`);
      return new ServiceResponse(code.FAILURE, message.FAILURE);
    }
  }

  async isUniqueCredentialsInvalid(username, email, phoneNumber) {
    let existingUser = null;

    // Check if user with username exists
    existingUser = await this.userRepository.find(
      { username: username },
      { multiple: false }
    );

    if (existingUser) {
      return new ServiceResponse(code.FAILURE, "Username already taken");
    }

    // Check if email exists
    existingUser = await this.userRepository.find(
      { email: email },
      { multiple: false }
    );
    if (existingUser) {
      return new ServiceResponse(
        code.FAILURE,
        "A user with that email already exists"
      );
    }

    // Check if phone number exists
    existingUser = await this.userRepository.find(
      { phoneNumber: phoneNumber },
      { multiple: false }
    );
    if (existingUser) {
      return new ServiceResponse(
        code.FAILURE,
        "A user with that phone number already exists"
      );
    }

    return new ServiceResponse(code.SUCCESS);
  }

  async login(loginId, password) {
    try {
      const user = await this.userRepository.find(
        { username: loginId },
        { multiple: false }
      );
      if (user === null) {
        return new ServiceResponse(
          code.AUTH_FAILURE,
          "The username and password you entered did not match our records. Please double-check and try again."
        );
      }

      const isValid = await this.encryptionService.compareHash(
        password,
        user.password
      );

      if (isValid) {
        const signedToken = this.encryptionService.signToken(
          { id: user.id, username: user.username },
          jwtSecret,
          { expiresIn: jwtTimeout }
        );
        return new ServiceResponse(code.SUCCESS, message.SUCCESS, signedToken);
      } else {
        return new ServiceResponse(
          code.AUTH_FAILURE,
          "The username and password you entered did not match our records. Please double-check and try again."
        );
      }
    } catch (e) {
      logger.error(`Error registering user: ${e.message}`);
      return new ServiceResponse(code.FAILURE, message.FAILURE);
    }
  }
}

module.exports = AuthService;
