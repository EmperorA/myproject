const mongooose = require("mongoose");
const Cart = require("../models/cartDB");

const addCart = () => {
  const productId = req.body.productId;
  const productImage = req.body.productImage;
  const productName = req.body.productName;
  const productPrice = req.body.productPrice;
  const productQty = req.body.productQty;
  const productTotal = req.body.productTotal;

  let count = 0;

  for (let i = 0; i < req.cart.length; i++) {
    if (req.cart[i].productId === productId) {
      req.cart[i].productQty += 1;

      count++;
    }
  }

  if (count === 0) {
    const cart_data = {
      productId: productId,
      productImage: productImage,
      productName: productName,
      productPrice: productPrice,
      productQty: productQty,
      productTotal: parseFloat(productPrice) * parseFloat(productQty),
    };

    req.cart.push(cart_data);
  }

  res.redirect("/cart.html");
};

const delCart = () => {
  const productId = req.query.id;

  for (let i = 0; i < req.cart.length; i++) {
    if (req.cart[i].productId === productId) {
      req.cart.splice(i, 1);
    }
  }
  res.redirect("/cart.html");
};


module.exports = { addCart, delCart };
