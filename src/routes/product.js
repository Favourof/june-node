const express = require("express");
const { addProduct } = require("../controllers/product");

const route = express.Router();

route.post("/", addProduct);

module.exports = route;
