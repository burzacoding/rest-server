const { getStagedData } = require("../middleware/userValidator");
const Product = require("../models/product");

const getProducts = async (req, res) => {
  let { limit = 100, page = 0 } = req.query;
  const products = Product.find({ active: true })
    .skip(Number(page * limit))
    .limit(Number(limit))
    .populate('categories', 'name');
  const total = Product.countDocuments({ active: true });
  const resp = await Promise.all([products, total]);
  res.status(200).json({
    results: resp[0],
    total: resp[1],
    limit,
    page,
  });
};

const getSingleProduct = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findOne({ _id: id });
  if (product) {
    return res.status(200).json({
      results: product ? [product] : [],
    });
  } else {
    return res.status(404).json({
      message: "Product not found",
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, price, description, available = false, categories } = getStagedData(
      req,
      ["name", "price", "description", "available", "categories"]
    );
    const userId = res.locals.user._id;
    const product = new Product({ name, createdBy: userId, price, description, available, categories}).populate('categories', 'name');
    const newProduct = await product.save();
    res.json({
      message: "Product created",
      newProduct: newProduct,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    })
  }
};

const updateProduct = async (req, res) => {
  const id = req.params.id;
  const { name } = getStagedData(req, ["name"]);
  if (!name) {
    return res.status(400).json({
      message: "Product name is required to update",
    });
  }

  const isValidId = Types.ObjectId.isValid(id);
  if (!isValidId) {
    return res.status(400).json({
      message: "Product ID is not valid",
    });
  }

  const product = await Product.findById(id);

  if (!product) {
    return res.status(404).json({
      message: "Product: " + id + " not found",
    });
  }

  product.name = name;

  await product.save();

  res.json({
    message: "Category updated",
    results: product,
  });
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    await Product.findByIdAndUpdate(id, { active: false });
    res.json({
      code: "product/deleted",
      message: "Product deleted",
    });
  } catch (err) {
    res.status(500).json({
      message: "Product not found",
    });
  }
};

module.exports = {
  getProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
