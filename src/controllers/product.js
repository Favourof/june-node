const Product = require("../models/product");

const addProduct = async (req, res) => {
  try {
    const { title, description, price, category, image } = req.body;
    // console.log(req.body.description);

    if (!title || !description || !price || !category || !image) {
      return res.status(400).json({
        status: false,
        message: "All field are Required",
      });
    }

    const product = await Product.create(req.body);

    if (product) {
      return res
        .status(201)
        .json({ status: true, message: "Product created Successfully" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: error.message });
  }
};

module.exports = { addProduct };
