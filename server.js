const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const hbs = require("hbs");
let ejs = require("ejs");
const Product = require("./models/productDb");
const { addProduct, getAllProduct } = require("./models/product.mongo");

const app = express();

// hbs.registerPartials(__dirname + "/views/partials");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const PORT = 3000;

const MONGO_URL =
  "mongodb+srv://blinkaustine:Osaseret2012@cluster0.hh9y7pu.mongodb.net/app?retryWrites=true&w=majority";

app.use("/", express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/index", async (req, res) => {
  let testing = await getAllProduct();

  let data = { sam: "good" };
  console.log(data);
  await res.render("index", { testing });
});

app.get("/shop.html", (req, res) => {
  res.render("Shop");
});
app.get("/detail.html", async (req, res) => {
  Product.find({}, (err, products) => {
    res.render("detail", {
      productList: products,
    });
  });
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
app.post("/manageProduct", async (res, req) => {
  await addProduct(req.body.data);

  res.render("index");
});
// app.get("/contact.html", async (res, req) => {
//   Product.find((err, products) => {
//    console.log(products)
//   })
// })

app.post("/product", async (req, res) => {
  let doc = new Product(data);

  let data = {
    productName: "test product",
    productDescription: " this product is a test ",
    productPrice: "200",
  };

  console.log(doc);
  await doc.save();
  res.send(doc);
});

app.get("/product", (req, res) => {
  res.render("");
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
