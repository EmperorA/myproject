const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { addProduct, getAllProduct } = require("./models/product.mongo");
const { addCategory, getAllCategory } = require("./models/category.mongo");
const { getAllOffer, addOffer } = require("./models/offers.mongo");
const { getAllReview, addReview } = require("./models/review.mongo");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const PORT = 3000;

const MONGO_URL =
  "mongodb+srv://blinkaustine:Osaseret2012@cluster0.hh9y7pu.mongodb.net/app?retryWrites=true&w=majority";

app.use("/", express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  let products = await getAllProduct();
  let categories = await getAllCategory();
  let offers = await getAllOffer();
  res.render("index", { products, categories, offers });
});

app.get("/shop.html", (req, res) => {
  res.render("Shop");
});
app.get("/detail.html", async (req, res) => {
  let reviews = await getAllReview();
  res.render("detail", { reviews });
});
app.get("/cart.html", (req, res) => {
  res.render("cart");
});
app.get("/checkout.html", (req, res) => {
  res.render("checkout");
});
app.get("/contact.html", async (req, res) => {
  res.render("contact");
});
app.post("/manageOffer", async (req, res) => {
  await addOffer(req.body);

  res.redirect("contact");
});
app.post("/manageCategory", async (req, res) => {
  await addCategory(req.body);

  res.redirect("contact");
});
app.post("/manageProduct", async (req, res) => {
  await addProduct(req.body);

  res.redirect("contact");
});
app.post("/detail.html", async (req, res) => {
  await addReview(req.body);
  res.render("detail");
});

mongoose.connection.on("open", () => {
  console.log("MongoDB connecting ready!");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

mongoose.connect(MONGO_URL);

app.listen(PORT, () => {
  console.log(`listening on ${PORT} ...`);
});
