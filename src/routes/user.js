const express = require("express");
const { register, login, authMe } = require("../controllers/user");
const authCheck = require("../middleware/authCheck");

const route = express.Router();

route.post("/register", register);
route.post("/login", login);
route.get("/me", authCheck, authMe);

module.exports = route;
