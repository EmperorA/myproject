const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  productId: String,
  productImage: String,
  productName: String,
  productPrice: String,
  productQty: String,
  productTotal: String,
});
module.exports = mongoose.model("Cart", CartSchema);
