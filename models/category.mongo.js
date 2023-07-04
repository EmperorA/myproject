const mongooose = require("mongoose");
const Category = require("./categoryDB");

const addCategory = async (cats) => {
  let cat = new Category(cats);

  await cat.save();
};
const getAllCategory = async () => {
  return await Category.find();
};
module.exports = { addCategory, getAllCategory };