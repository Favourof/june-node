const express = require("express");
const {
  addProduct,
  getProduct,
  getSingleProduct,
} = require("../controllers/product");

const route = express.Router();

route.post("/", addProduct);
route.get("/", getProduct);
route.get("/:id", getSingleProduct);

module.exports = route;
