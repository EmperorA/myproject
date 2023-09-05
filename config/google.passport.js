const express = require("express");
const passport = require("passport");
const { Strategy } = require("passport-google-oauth20");
const session = require("express-session");
const User = require("../models/userDB");
// const cookieSession = require("cookie-session");

require("dotenv").config();

const config = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  COOKIE_KEY_1: process.env.COOKIE_KEY_1,
  COOKIE_KEY_2: process.env.COOKIE_KEY_2,
};

const AUTH_OPTIONS = {
  callbackURL: "/auth/google/callback",
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
  passReqToCallback: true,
};

function verifyCallback(req, accessToken, refreshToken, profile, done) {
  return done(null, profile);
}

passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

module.exports = (app) => {
  app.use(
    session({
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  function checkLoggedIn(req, res, next) {
    console.log("Current user is:", req.user);
    const isLoggedIn = req.isAuthenticated() && req.user;
    if (!isLoggedIn) {
      return res.status(401).json({
        error: "You must log in!",
      });
    }
    next();
  }

  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["email"],
    })
  );
  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/login",
      successRedirect: "/",
      session: true,
    }),
    (req, res) => {
      // console.log("Google called us back");
      return res.send("Failed to log in!");
    }
  );
  app.get("/", checkLoggedIn, (req, res) => {
    res.render("index");
  });
};
