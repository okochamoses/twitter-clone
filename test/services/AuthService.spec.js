const expect = require("chai").expect;
const AuthService = require("../../services/AuthService");
const EncryptionService = require("../../services/EncryptionService");
const store = [
  {
    username: "user1",
    email: "user1@email.com",
    phoneNumber: "1234567891",
    fullName: "test user 1"
  },
  {
    username: "user2",
    email: "user2@email.com",
    phoneNumber: "1234567892",
    fullName: "test user 2"
  },
  {
    username: "user3",
    email: "user3@email.com",
    phoneNumber: "1234567893",
    fullName: "test user 3"
  }
];
const userRepository = {
  find: query => {
    const key = Object.keys(query)[0];
    const value = query[key];

    let data = null;
    store.forEach(user => {
      if (user[key] === value) {
        data = user;
      }
    });
    return data;
  },
  create: object => {
    store.push(object);
    return store;
  }
};
const encryptionService = new EncryptionService();
const authService = new AuthService({ userRepository, encryptionService });

describe("test authorization service", () => {
  it("should save a user to the store", async () => {
    const dummy = {
      username: "user4",
      email: "user4@email.com",
      phoneNumber: "1234567894",
      fullName: "test user 4",
      password: "123456"
    };

    // Register dummy data
    await authService.register(dummy);
    // Check if data exists on

    const storeCheck = await userRepository.find({ username: dummy.username });
    console.log(storeCheck);
    expect(storeCheck.username).to.equal(dummy.username);
    expect(storeCheck.fullName).to.equal(dummy.fullName);
    expect(storeCheck.email).to.equal(dummy.email);
  });

  it("should return FAILURE response for existing username, email or phoneNumber", async () => {
    const result = await authService.isUniqueCredentialsInvalid(
      "user1",
      "email@gmail.com",
      "1234567898"
    );
    expect(result.code).to.equal(10);
  });
});
