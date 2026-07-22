const express = require("express");
const {
  addProduct,
  getProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");

const route = express.Router();


route.post("/", addProduct);
route.get("/", getProduct);
route.get("/:id", getSingleProduct);
route.put("/:id", updateProduct);
route.delete("/:id", deleteProduct);

module.exports = route;
