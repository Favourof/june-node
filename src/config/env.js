const dotenv = require("dotenv").config();

const envobj = {
  port: process.env.PORT,
  mongodb_url: process.env.MONGODB_URL,
  saltRound: process.env.SALT_ROUND,
  jwtSecret: process.env.JWT_SECRET,
  expireIn: process.env.JWT_EXPIREIN,
};

module.exports = envobj;
