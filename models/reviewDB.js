const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  message: String,
  name: String,
  email: String,
});

module.exports = mongoose.model("Review", ReviewSchema);
