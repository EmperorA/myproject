// const { isValidObjectId } = require("mongoose");
// const { Cart } = require("../models/cartDB");
// const { User } = require("../models/user");

// exports.addItemToCart = async (req, res) => {
//   let userId = req.params.userId;
//   let user = await User.exists({ _id: userId });

//   if (!userId || !isValidObjectId(userId) || !user)
//     return res.status(400).send({ status: false, message: "Invalid user ID" });

//   let productId = req.body.productId;
//   if (!productId)
//     return res.status(400).send({ status: false, message: "Invalid product" });

//   let cart = await Cart.findOne({ userId: userId });

//   if (cart) {
//     let itemIndex = cart.products.findIndex((p) => p.productId == productId);

//     if (itemIndex > -1) {
//       let productItem = cart.products[itemIndex];
//       productItem.quantity += 1;
//       cart.products[itemIndex] = productItem;
//     } else {
//       cart.products.push({ productId: productId, quantity: 1 });
//     }
//     cart = await cart.save();
//     return res.status(200).send({ status: true, updatedCart: cart });
//   } else {
//     const newCart = await Cart.create({
//       userId,
//       products: [{ productId: productId, quantity: 1 }],
//     });

//     return res.status(201).send({ status: true, newCart: newCart });
//   }
// };

// exports.getCart = async (req, res) => {
//   let userId = req.params.userId;
//   let user = await User.exists({ _id: userId });

//   if (!userId || !isValidObjectId(userId) || !user)
//     return res.status(400).send({ status: false, message: "Invalid user ID" });

//   let cart = await Cart.findOne({ userId: userId });
//   if (!cart)
//     return res
//       .status(404)
//       .send({ status: false, message: "Cart not found for this user" });

//   res.status(200).send({ status: true, cart: cart });
// };

// exports.decreaseQuantity = async (req, res) => {
//   // use add product endpoint for increase quantity
//   let userId = req.params.userId;
//   let user = await User.exists({ _id: userId });
//   let productId = req.body.productId;

//   if (!userId || !isValidObjectId(userId) || !user)
//     return res.status(400).send({ status: false, message: "Invalid user ID" });

//   let cart = await Cart.findOne({ userId: userId });
//   if (!cart)
//     return res
//       .status(404)
//       .send({ status: false, message: "Cart not found for this user" });

//   let itemIndex = cart.products.findIndex((p) => p.productId == productId);

//   if (itemIndex > -1) {
//     let productItem = cart.products[itemIndex];
//     productItem.quantity -= 1;
//     cart.products[itemIndex] = productItem;
//     cart = await cart.save();
//     return res.status(200).send({ status: true, updatedCart: cart });
//   }
//   res
//     .status(400)
//     .send({ status: false, message: "Item does not exist in cart" });
// };

// exports.removeItem = async (req, res) => {
//   let userId = req.params.userId;
//   let user = await User.exists({ _id: userId });
//   let productId = req.body.productId;

//   if (!userId || !isValidObjectId(userId) || !user)
//     return res.status(400).send({ status: false, message: "Invalid user ID" });

//   let cart = await Cart.findOne({ userId: userId });
//   if (!cart)
//     return res
//       .status(404)
//       .send({ status: false, message: "Cart not found for this user" });

//   let itemIndex = cart.products.findIndex((p) => p.productId == productId);
//   if (itemIndex > -1) {
//     cart.products.splice(itemIndex, 1);
//     cart = await cart.save();
//     return res.status(200).send({ status: true, updatedCart: cart });
//   }
//   res
//     .status(400)
//     .send({ status: false, message: "Item does not exist in cart" });
// };

// // exports.addToCart = async (productId, productName, productPrice) => {
// //   try {
// //     const userId = "UserID"; // Replace this with the actual user ID obtained after user authentication

// //     const response = await fetch("/cart/add", {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //       body: JSON.stringify({
// //         userId,
// //         productId,
// //         quantity: 1, // You can change this quantity as needed
// //       }),
// //     });

// //     const user = await response.json();
// //     console.log("User shopping cart:", user.cart);

// //     // Once the product is added to the cart, update the shopping cart on the page
// //     updateCart(user.cart);
// //   } catch (error) {
// //     console.error("Error adding product to cart:", error);
// //   }
// // };

// // ShoppingCart.js

// // import React, { useState } from 'react';

// // const ShoppingCart = () => {
// //   const [cartItems, setCartItems] = useState([]);

// //   const addToCart = (product) => {
// //     const existingItem = cartItems.find(item => item._id === product._id);
// //     if (existingItem) {
// //       setCartItems(cartItems.map(item => item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item));
// //     } else {
// //       setCartItems([...cartItems, { ...product, quantity: 1 }]);
// //     }
// //   };

// //   const removeFromCart = (productId) => {
// //     setCartItems(cartItems.filter(item => item._id !== productId));
// //   };

// //   const clearCart = () => {
// //     setCartItems([]);
// //   };

// //   const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

// // return (
// //   <div>
// //     <h2>Shopping Cart</h2>
// //     {cartItems.length === 0 ? (
// //       <p>Your cart is empty.</p>
// //     ) : (
// //       <div>
// //         {cartItems.map(item => (
// //           <div key={item._id}>
// //             <h3>{item.name}</h3>
// //             <p>Price: ${item.price}</p>
// //             <p>Quantity: {item.quantity}</p>
// //             <button onClick={() => addToCart(item)}>+</button>
// //             <button onClick={() => removeFromCart(item._id)}>-</button>
// //           </div>
// //         ))}
// //         <p>Total: ${cartTotal}</p>
// //         <button onClick={clearCart}>Clear Cart</button>
// //         {/* Implement checkout and payment button */}
// //       </div>
// //     )}
// //   </div>
// // );
// // };

// // export default ShoppingCart;

// exports.Cart((oldCart) => {
//   this.items = oldCart.items || {};
//   this.totalQty = oldCart.totalQty || 0;
//   this.totalPrice = oldCart.totalPrice || 0;

//   this.add = function (item, id) {
//     let storedItem = this.items[id];
//     if (!storedItem) {
//       storedItem = this.items[id] = { item: item, qty: 0, price: 0 };
//     }
//     storedItem.qty++;
//     storedItem.price = storedItem.item.price * storedItem.qty;
//     this.totalQty++;
//     this.totalPrice += storedItem.item.price;
//   };

//   this.reduceByOne = function (id) {
//     this.items[id].qty--;
//     this.items[id].price -= this.items[id].item.price;
//     this.totalQty--;
//     this.totalPrice -= this.items[id].item.price;

//     if (this.items[id].qty <= 0) {
//       delete this.items[id];
//     }
//   };

//   this.removeItem = function (id) {
//     this.totalQty -= this.items[id].qty;
//     this.totalPrice -= this.items[id].price;
//     delete this.items[id];
//   };

//   this.generateArray = function () {
//     const arr = [];
//     for (let id in this.items) {
//       arr.push(this.items[id]);
//     }
//     return arr;
//   };
// });
