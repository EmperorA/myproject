const express = require("express");
const router = express.Router();
// const session = require("express-session");
const Product = require("../models/productDb");

router.get("/", (req, res, next) => {
  if (!req.query.productId) {
    if (req.session.cart) {
      let cart = req.session.cart;
      res.render("cart", { cart: cart.length > 0 ? cart : [] });
    } else {
      res.render("cart", { cart: [] });
    }
  } else {
    var item = req.query.productId;

    Product.findOne({ _id: item }).then((response) => {
      if (typeof req.session.cart == "undefined") {
        req.session.cart = [];

        req.session.cart.push({
          title: response.productName,
          qty: 1,
          price: response.productPrice,
          image: "/img/" + response._id + "/" + response.productImage,
        });
      } else {
        var cart = req.session.cart;
        var newItem = true;
        for (var i = 0; i < cart.length; i++) {
          if (cart[i].title == item) {
            cart[i].qty++;
            newItem = false;
            break;
          }
        }
        if (newItem) {
          cart.push({
            title: response.productName,
            qty: 1,
            price: response.productPrice,
            image: "/public/img" + response._id + "/" + response.productImage,
          });
        }
      }
      res.render("cart", { cart: req.session.cart });
      // req.flash("success", "Product added!");
    });
  }
});

module.exports = router;
