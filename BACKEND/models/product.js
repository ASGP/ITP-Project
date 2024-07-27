const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  artisanID: {
    type: String,
    required: true,
  },
  productID: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  availability: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
