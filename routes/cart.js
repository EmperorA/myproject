const express = require("express");
const router = express.Router();
const Product = require("../models/productDb");

router.get("/add/:product", (req, res, next) => {
  var item = req.params.product;

  Product.findOne({ _id: item }).then((response) => {
    if (typeof req.session.cart == "undefined") {
      req.session.cart = [];

      req.session.cart.push({
        title: response.productName,
        qty: 1,
        price: response.productPrice,
        image: response.productImage,
      });
    } else {
      let cart = req.session.cart;
      let newItem = true;

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
          image: response.productImage,
        });
      }
      console.log(cart);
    }

    req.flash("success", "Product added!");
    res.redirect("back");
  });
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

router.get("/update/:product", (req, res) => {
  let item = req.params.product;
  let cart = req.session.cart;
  let action = req.query.action;

  for (var i = 0; i < cart.length; i++) {
    if (cart[i].title == item) {
      switch (action) {
        case "add":
          cart[i].qty++;
          break;
        case "minus":
          cart[i].qty--;
          if (cart[i].qty < 1) cart.splice(i, 1);
          break;
        case "remove":
          cart.splice(i, 1);
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
