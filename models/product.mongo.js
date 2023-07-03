const mongooose = require("mongoose");
const Product = require("./productDb")

const addProduct = async(data) => {
// let data = {
//     productImage: "product-9",
//     productName: "test product",
//     productDescription: " this product is a test ",
//     productPrice: "200",
//     productRating: 4,
//   };
  let doc = new Product(data);

  await doc.save();
}
const getAllProduct = async() =>{

return await Product.find()
}
module.exports = {addProduct, getAllProduct}