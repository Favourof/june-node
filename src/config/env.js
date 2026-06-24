const dotenv = require("dotenv").config();

const envobj = {
  port: process.env.PORT,
  mongodb_url: process.env.MONGODB_URL,
};

module.exports = envobj;
