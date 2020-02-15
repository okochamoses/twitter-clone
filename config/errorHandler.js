const { isCelebrate } = require("celebrate");
const { code, message } = require("../services/responses/ResponseObjects");
const ServiceResponse = require("../services/responses/ServiceResponse");
module.exports = (err, req, res, next) => {
  if (isCelebrate(err)) {
    return res
      .status(400)
      .json(new ServiceResponse(code.VALIDATION_ERR, err.message));
  }
  return res
    .status(500)
    .json(new ServiceResponse(code.AUTH_FAILURE, err.message));
};
