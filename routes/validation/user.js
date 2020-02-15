const { Joi, Segments } = require("celebrate");

const querySchema = {
  search: {
    [Segments.BODY]: Joi.object({
      searchValue: Joi.string().required()
    })
  }
};

module.exports = querySchema;
