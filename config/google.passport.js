const passport = require("passport");
const { Strategy } = require("passport-google-oauth20");
const User = require("../models/userDB");
const { checkLoggedIn } = require("../middleware/auth");
require("dotenv").config();

const config = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
};

const AUTH_OPTIONS = {
  callbackURL: "/auth/google/callback",
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
  passReqToCallback: true,
  userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
};

function verifyCallback(req, accessToken, refreshToken, profile, done) {
  if (profile) {
    const userData = {
      googleId: profile.id,
    };
    if (profile.displayName) userData.username = profile.displayName;
    if (profile.emails && profile.emails[0] && profile.emails[0].value) {
      userData.email = profile.emails[0].value;
    }

    User.findOrCreate(userData, (err, user) => {
      if (err) {
        console.error(err); // Log the error
        return done(err);
      }
      return done(null, user);
    });
  } else {
    return done(new Error("Profile is not provided by Google"));
  }
}

passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

passport.serializeUser(async (user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile"],
    })
  );
  app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    function (req, res) {
      // This is where you should save profile and access token to session
      req.session.profile = req.user.profile;
      req.session.accessToken = req.user.accessToken;
      req.session.save((err) => {
        if (err) {
          console.error("Session save error:", err);
        }
        res.redirect("/");
      });
    }
  );
  app.get("/", checkLoggedIn, (req, res) => {
    res.render("index", { user: req.user });
  });
};
