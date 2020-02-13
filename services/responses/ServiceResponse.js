class ServiceResponse {
  constructor(code, message, data) {
    this.code = code;
    this.message = message;
    this.data = data;
  }

  static code = {
    SUCCESS: 0,
    FAILURE: 10,
    AUTH_FAILURE: 20
  };

  static message = {
    SUCCESS: "Operation Successful",
    FAILURE: "Oops! Something went wrong",
    AUTH_FAILURE: "Authentication failure"
  };
}

module.exports = ServiceResponse;
