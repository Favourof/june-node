const express = require("express");
const { register } = require("../controllers/user");

const route = express.Router();

route.post("/register", register);

module.exports = route;
