const mongoose = require("mongoose");
const Cart = require("../models/cartDB");
const Product = require("../models/productDb");

const addItemToCart = async (req, res) => {
  const { userId, productId } = req.body;
  let data = null;
  const quantity = Number.parseInt(req.body.quantity);

  // -------Get users Cart ------

  let cart = Cart.findOne({
    userId: userId,
  });

  //-----Get Selected Product Details ----
  const productDetails = await Product.findById(productId);

  // -- Check if cart Exists and Check the quantity if items -------
  if (cart) {
    let indexFound = cart.items.findIndex((p) => p.productId == productId);
    console.log("Index", indexFound);
    //----------check if product exist,just add the previous quantity with the new quantity and update the total price-------
    if (indexFound != -1) {
      cart.items[indexFound].quantity =
        cart.items[indexFound].quantity + quantity;
      cart.items[indexFound].total =
        cart.items[indexFound].quantity * productDetails.price;
      cart.items[indexFound].price = productDetails.price;
      cart.subTotal = cart.items
        .map((item) => item.total)
        .reduce((acc, curr) => acc + curr);
    }
    //----Check if Quantity is Greater than 0 then add item to items Array ----
    else if (quantity > 0) {
      cart.items.push({
        productId: productId,
        quantity: quantity,
        price: productDetails.price,
        total: parseInt(productDetails.price * quantity).toFixed(2),
      });
      cart.subTotal = cart.items
        .map((item) => item.total)
        .reduce((acc, curr) => acc + curr);
    }
    //----if quantity of price is 0 throw the error -------
    else {
      return res.status(400).json({
        code: 400,
        message: "Invalid request",
      });
    }

    data = await cart.save();
  }
  //------if there is no user with a cart then it creates a new cart and then adds the item to the cart that has been created---------
  else {
    const cartData = {
      userId: userId,
      items: [
        {
          productId: productId,
          quantity: quantity,
          price: productDetails.price,
          total: parseInt(productDetails.price * quantity),
        },
      ],
      subTotal: parseInt(productDetails.price * quantity),
    };
    cart = new Cart(cartData);
    data = await cart.save();
  }

  return res.status(200).send({
    code: 200,
    message: "Add to Cart successfully!",
    data: data,
  });
};
const getAllCart = async () => {
  return await Cart.find();
};
module.exports = { addItemToCart, getAllCart };
