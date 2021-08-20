const { Schema, model } = require("mongoose");

const ErrorCodes = {
  name: {
    required: "error/name-required"
  },
  categories: {
    required: "error/category-required",
  },
};

const ProductSchema = Schema({
  name: {
    type: String,
    required: [true, ErrorCodes.name.required],
  },
  active: {
    type: Boolean,
    default: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  description: String,
  available: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  categories: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: [true, ErrorCodes.categories.required],
  },
});

ProductSchema.methods.toJSON = function() {
  const { __v, active, _id: uid, ...rest } = this.toObject();
  return {
    ...rest, 
    uid
  }
}

module.exports = model("Product", ProductSchema);
