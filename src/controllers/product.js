const Product = require("../models/product");

const addProduct = async (req, res) => {
  try {
    const { title, description, price, category, image } = req.body;
    // const title = req.body.title;
    // console.log(req.body.description);

    if (!title || !description || !price || !category || !image) {
      return res.status(400).json({
        status: false,
        message: "All field are Required",
      });
    }

    const product = await Product.create({
      title,
      description,
      price,
      category,
      image,
    });

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

const getProduct = async (req, res) => {
  try {
    const product = await Product.find();
    return res.status(200).json({
      status: true,
      message: "Get product Successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    return res.status(200).json({
      status: true,
      message: "Get product Successfully",
      product,
    });
    console.log(id);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res
        .status(400)
        .json({ status: false, message: "Product not Found" });
    }

    return res
      .status(200)
      .json({ status: true, message: "product updated Successfully", product });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res
        .status(400)
        .json({ status: false, message: "Product not found" });
    }

    return res
      .status(200)
      .json({ status: true, message: "Product Deleted Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

module.exports = {
  addProduct,
  getProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
