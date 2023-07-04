const mongoose = require("mongoose");

const OfferSchema = new mongoose.Schema({
  offerImage: String,
  offerDiscount: String,
  offerType: String,
  offerLink: String,
});

module.exports = mongoose.model("Offer", OfferSchema);
