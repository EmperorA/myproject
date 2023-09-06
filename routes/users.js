const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const Users = require("../models/userDB");

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", async (req, res) => {
  const { username, email, password, password2 } = req.body;

  try {
    const existingUser = await Users.findOne({ username });

    if (existingUser) {
      req.flash("danger", "Username exists, choose another!");
      return res.redirect("/users/register");
    }

    const newUser = new Users({
      username,
      email,
      password,
      admin: 0,
    });

    bcrypt.genSalt(10, async (err, salt) => {
      try {
        const hash = await bcrypt.hash(newUser.password, salt);
        newUser.password = hash;
        await newUser.save();
        req.flash("success", "You are now registered");
        res.redirect("/users/login");
      } catch (error) {
        console.error(error);
        req.flash("danger", "An error occurred during registration");
        res.redirect("/users/register");
      }
    });
  } catch (error) {
    console.error(error);
    req.flash("danger", "An error occurred during registration");
    res.redirect("/users/register");
  }
});

router.get("/login", (req, res) => {
  if (res.locals.user) res.redirect("/");
  res.render("login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login",
    failureFlash: true,
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("sucess", "you are logged out!");
  res.redirect("/users/login");
});

module.exports = router;
