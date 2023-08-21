const express = require("express");
const session = require("express-session");
const path = require("path");
const flash = require("connect-flash");
const bodyParser = require("body-parser");

const cookieParser = require("cookie-parser");

const { query } = require("express-validator");
const { mongoConnect } = require("./services/mongo");
const { addProduct, getAllProduct } = require("./models/product.mongo");
const { addCategory, getAllCategory } = require("./models/category.mongo");
const { getAllOffer, addOffer } = require("./models/offers.mongo");
const { getAllReview, addReview } = require("./models/review.mongo");

const { sendMail } = require("./auth/sendMail");
const { adminAuth, userAuth } = require("./middleware/auth");
const cart = require("./config/cart.router");

require("dotenv").config();
const app = express();

const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// app.use(cors({ origin: "*" }));

// app.get("*", (req, res, next) => {
//   // res.locals.cart = req.session.cart;
//   res.locals.user = req.user || null;
// });

app.use("/", express.static(path.join(__dirname, "public")));

//global errors variables
app.locals.errors = null;

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(query());
app.use(cookieParser());
app.use("/api/auth", require("./auth/router"));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use("/cart", cart);

//express messages miiddleware

// app.use(require("connect-flash")());
// app.use((req, res, next) => {
//   res.locals.messages = require("express-messages")(req, res);
//   next();
// });

// app.use("/:userId", cart);
// app.use(function (req, res, next) {
//   res.locals.login = req.isAuthenticated();
//   res.locals.session = req.session;
//   next();
// });
// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   const err = new Error("Not Found");
//   err.status = 404;
//   next(err);
// });

// error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

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

app.get("/checkout.html", (req, res) => {
  res.render("checkout");
});
app.get("/contact.html", async (req, res) => {
  res.render("contact");
});
app.get("/cart", async (req, res) => {
  res.render("cart", { cart });
});
app.get("/register", (req, res) => {
  res.render("register");
});
app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/admin", adminAuth, (req, res) => {
  res.render("admin");
});
app.get("/getUsers", adminAuth, (req, res) => {
  res.render("admin");
});
app.get("/basic", userAuth, (req, res) => {
  res.render("user");
});

app.get("/logout", (req, res) => {
  res.cookie("jwt", "", { maxAge: "1" });
  res.redirect("/");
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

app.post("/sendMessage", async (req, res) => {
  const { name, email, subject, message } = req.body;

  // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // if (!emailRegex.test(email)) {
  //   return res
  //     .status(400)
  //     .json({ error: "Please enter a valid email address." });
  // }
  // if (!name || !email || !message || subject) {
  //   return res.status(400).json({ error: "Please fill out all fields." });
  // }

  await sendMail(name, email, subject, message);
  // .json({ message: 'Email sent successfully!' })

  res.render("contact");
});

// app.get("*", (req, res, next) => {
//   res.locals.cart = req.session.cart;
//   next();
// });

require("./auth/router");
require("./config/passport")(app);

async function startServer() {
  await mongoConnect();

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT} ...`);
  });
}

startServer();
