const mongooose = require("mongoose");
const Product = require("./productDb");

const addProduct = async (data) => {
 
  let doc = new Product(data);

  await doc.save();
};
const getAllProduct = async () => {
  return await Product.find();
};
module.exports = { addProduct, getAllProduct };
