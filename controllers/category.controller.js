const { Types } = require("mongoose");
const { getStagedData } = require("../middleware/userValidator");
const Category = require("../models/category");

const getCategories = async (req, res) => {
  let { limit = 100, page = 0 } = req.query;
  const category = Category.find({ active: true })
    .populate('createdBy', 'name')
    .skip(Number(page * limit))
    .limit(Number(limit));
  const total = Category.countDocuments({ active: true });
  const resp = await Promise.all([category, total]);
  res.status(200).json({
    results: resp[0],
    total: resp[1],
    limit,
    page,
  });
};

const getSingleCategory = async (req, res) => {
  const id = req.params.id;
  const category = await Category.findOne({ _id: id });
  if (category) {
    return res.status(200).json({
      results: category ? [category] : [],
    });
  } else {
    return res.status(404).json({
      message: "Category not found",
    });
  }
};

const createCategory = async (req, res) => {
  const { name } = getStagedData(req, ["name"]);

  // ESTO TIENE QUE SER UN MIDDLEWARE
  const categoryAlreadyExists = await Category.findOne({ name });
  if (categoryAlreadyExists) {
    return res.status(400).json({ message: "Category already exists" });
  }
  // ESTO TIENE QUE SER UN MIDDLEWARE

  const userId = res.locals.user._id;

  const category = new Category({ name, createdBy: userId });;

  const newCategory = await category.save();

  res.json({
    message: "Category created",
    newCategory
  });
};

const updateCategory = async (req, res) => {
  const id = req.params.id;

  const { name } = getStagedData(req, ["name"]);

  if (!name) {
    return res.status(400).json({
      message: "Category name is required to update",
    });
  }

  const isValidId = Types.ObjectId.isValid(id);
  if (!isValidId) {
    return res.status(400).json({
      message: "Category ID is not valid",
    });
  }

  const category = await Category.findById(id);

  if (!category) {
    return res.status(404).json({
      message: "Category: " + id + " not found",
    });
  }

  category.name = name;

  await category.save();

  res.json({
    message: "Category updated",
    category: category,
  });
};

const deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;
    await Category.findByIdAndUpdate(id, { active: false });
    res.json({
      code: "category/deleted",
      message: "Category deleted",
    });
  } catch (err) {
    res.status(500).json({
      message: "Category not found",
    });
  }
};

module.exports = {
  getCategories,
  getSingleCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
