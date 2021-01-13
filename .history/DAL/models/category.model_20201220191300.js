const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: "Required",
  },
});

const model = mongoose.model("category", categorySchema, "categories");

module.exports = model;
