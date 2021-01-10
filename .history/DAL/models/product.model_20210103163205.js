const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Required",
  },
  sku: {
    type: String,
    required: "Required",
  },
  qty: {
    type: Number,
    required: "Required",
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: "Required",
  },
  discount: {
    type: String,
    required: "Required",
  },
  img: {
    type: String,
    required: "Required",
  },
  category_id: {
    type: String,
    required: "Required",
  },
  category: {
    type: String,
  },
});

const model = mongoose.model("product", productSchema, "products");

module.exports = model;
