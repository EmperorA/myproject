const mongooose = require("mongoose");
const Review = require("./reviewDB");

const addReview = async (rev) => {

  let doc = new Review(rev);
  await doc.save();
};
const getAllReview = async () => {
  return await Review.find();
};
module.exports = { addReview, getAllReview };
