const mongoose = require("mongoose");
const User = require("../models/user");
const Category = require("../models/category");
const Product = require("../models/product");

const allowedCategories = ["users", "products", "categories", "roles"];

const searchUsers = async (termino = "", res) => {
  const isMongoId = mongoose.Types.ObjectId.isValid(termino);
  if (isMongoId) {
    const result = await User.findById(termino);
    return res.status(200).json({
      results: result ? [result] : [],
    });
  }

  const regex = new RegExp(termino, "i");
  const users = await User.find({
    $or: [{ name: regex }, { email: regex }],
    $and: [{ active: true }],
  });
  res.status(200).json({
    results: users,
  });
};
const searchProducts = async (product = "", res) => {
  const isMongoId = mongoose.Types.ObjectId.isValid(product);
  if (isMongoId) {
    const result = await Product.findById(product).populate('categories', 'name');
    return res.status(200).json({
      results: result ? [result] : [],
    });
  }

  const regex = new RegExp(product, "i");
  const products = await Product.find({
    $or: [{ name: regex }, { description: regex }],
    $and: [{ active: true }],
  }).populate('categories', 'name');
  res.status(200).json({
    results: products,
  });
};

const searchCategories = async (category = "", res) => {
  const isMongoId = mongoose.Types.ObjectId.isValid(category);
  if (isMongoId) {
    const result = await Category.findById(category);
    return res.status(200).json({
      results: result ? [result] : [],
    });
  }

  const regex = new RegExp(category, "i");
  const categoriesFound = await Category.find({
    $or: [{ name: regex }],
    $and: [{ active: true }],
  });
  res.status(200).json({
    results: categoriesFound,
  });
};

const searchRoles = async (role = "", res) => {};

const search = async (req, res) => {
  const { coleccion, termino } = req.params;

  if (!allowedCategories.includes(coleccion)) {
    return res
      .status(400)
      .json({ message: "The requested category is not allowed." });
  }

  switch (coleccion) {
    case "users": {
      await searchUsers(termino, res);
      return;
    }
    case "products": {
      await searchProducts(termino, res);
      return;
    }
    case "categories": {
      await searchCategories(termino, res);
      return
    }
    case "roles": {
    }
    default: {
      return res
        .status(500)
        .json({
          message: "Contact the administrator.",
          code: "error/not-contemplated-in-switch",
        });
    }
  }
};

module.exports = {
  search,
};
