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
          if (cart[i].title == response.productName) {
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

router.get("/checkout.html", (req, res) => {
  if (req.session.cart && req.session.cart.length == 0) {
    delete req.session.cart;
    res.redirect("/checkout");
  } else {
    res.render("checkout", {
      title: "checkout",
      cart: req.session.cart,
    });
  }
});

router.get("/update", (req, res) => {
  let item = req.params.product;
  let cart = req.session.cart;
  let action = req.query.action;

  for (var i = 0; i < cart.length; i++) {
    if (cart[i].title) {
      switch (action) {
        case "add":
          cart[i].qty++;
          break;
        case "minus":
          cart[i].qty--;
          if (cart[i].qty < 1) cart.slice(i, 1);
          break;
        case "remove":
          cart.slice(i, 1);
          if (cart.length == 0) delete req.session.cart;
          break;
        default:
          console.log("update problem");
          break;
      }
      break;
    }
  }
  res.redirect("/cart");
});

module.exports = router;
