const mongoose = require("mongoose");


const ProductSchema = new mongoose.Schema({
  productImage: String,
  productName: String, 
  productDescription: String,
  productPrice: String,
  productRating: Number
});


module.exports = mongoose.model("Product", ProductSchema);

