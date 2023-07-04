const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  categoryImage: String,
  categoryName: String,
  categoryItems: String,
});

module.exports = mongoose.model("Category", CategorySchema);
