module.exports = {
  dbName: process.env.DB_NAME,
  dbHost: process.env.DB_HOST,
  dbUser: process.env.DB_USERNAME,
  dbPass: process.env.DB_PASSWORD,
  dbPort: process.env.DB_PORT,

  jwtSecret: process.env.JWT_SECRET,
  jwtTimeout: parseInt(process.env.JWT_TIMEOUT),

  redisUrl: process.env.REDIS_URL,
  redisPort: process.env.REDIS_PORT
};
