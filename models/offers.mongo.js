const mongooose = require("mongoose");
const Offer = require("./offersDB");

const addOffer = async (promo) => {
  let doc = new Offer(promo);

  await doc.save();
};
const getAllOffer = async () => {
  return await Offer.find();
};
module.exports = { addOffer, getAllOffer };
