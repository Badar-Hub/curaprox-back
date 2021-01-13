const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: "Required",
  },
  subCategories: {
    type:Array
  }
});

const model = mongoose.model("category", categorySchema, "categories");

module.exports = model;
