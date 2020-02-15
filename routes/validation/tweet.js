const { Joi, Segments } = require("celebrate");

const querySchema = {
  postTweet: {
    [Segments.BODY]: Joi.object({
      message: Joi.string().required()
    })
  },
  replyTweet: {
    [Segments.BODY]: Joi.object({
      message: Joi.string().required()
    })
  },
  searchTweet: {
    [Segments.BODY]: Joi.object({
      searchValue: Joi.string().required()
    })
  }
};

module.exports = querySchema;
