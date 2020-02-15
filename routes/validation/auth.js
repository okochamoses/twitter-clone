const { Joi, Segments } = require("celebrate");

const querySchema = {
  login: {
    [Segments.BODY]: Joi.object({
      loginId: Joi.string().required(),
      password: Joi.string().required()
    })
  },
  register: {
    [Segments.BODY]: Joi.object({
      fullName: Joi.string().required(),
      email: Joi.string()
        .required()
        .email(),
      username: Joi.string().required(),
      password: Joi.string()
        .required()
        .alphanum(),
      phoneNumber: Joi.string().required()
    })
  }
};

module.exports = querySchema;
