const User = require("../models/user");
const bcrypt = require("bcryptjs");
const passport = require("passport");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWTSECRET;
const LocalStrategy = require("passport-local");

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });
// passport.deserializeUser((id, done) => {
//   User.findById(id).then((user) => {
//     done(null, user);
//   });
//   // done(null, id);
// });

// const data = {
//   usernameField: "username",
//   passwordField: "password",
//   passReqToCallBack: true,
// };
// passport.use(
//   "local.register",
//   new LocalStrategy(data, async (req, username, password, done) => {
//     let user = await User.findOne({ username: username });
//     if (!user) {
//       var newUser = new User();
//       (newUser.username = username),
//         (newUser.password = newUser.encryptPassword(password));
//      try{ newUser.save((err, result) => {
//         if (err) {
//           return done(err);
//         }
//         return done(null, newUser);
//       });}catch(err){
//         return done(err)
//       }
//     }
//   })
// );

exports.register = async (req, res, next) => {
  const { username, password } = req.body;

  bcrypt.hash(password, 10).then(async (hash) => {
    await User.create({
      username,
      password: hash,
    })
      .then((user) => {
        const maxAge = 3 * 60 * 60;
        const token = jwt.sign(
          {
            id: user._id,
            username,
            role: user.role,
          },
          jwtSecret,
          {
            expiresIn: maxAge,
          }
        );

        // res.status(201).json({
        //   message: "User successfully created",
        //   user: user._id,
        // });
        res.redirect("/");
      })
      .catch((error) =>
        res.status(400).json({
          message: "User not successful created",
          error: error.message,
        })
      );
  });
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      res.status(400).json({
        message: "Login not successful",
        error: "User not found",
      });
    } else {
      bcrypt.compare(password, user.password).then((result) => {
        if (result) {
          const maxAge = 3 * 60 * 60;
          const token = jwt.sign(
            { id: user._id, username, role: user.role },
            jwtSecret,
            {
              expiresIn: maxAge, // 3hrs in sec
            }
          );

          res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: maxAge * 1000, // 3hrs in ms
          });
          res.redirect("/");
        } else {
          res.status(400).json({ message: "Login not successful" });
        }
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};

exports.update = async (req, res, next) => {
  const { role, id } = req.body;
  // Verifying if role and id is presnt
  if (role && id) {
    // Verifying if the value of role is admin
    if (role === "admin") {
      await User.findById(id)
        .then((user) => {
          // Third - Verifies the user is not an admin
          if (user.role !== "admin") {
            user.role = role;
            user.save();
          } else {
            res.status(400).json({ message: "User is already an Admin" });
          }
        })

        .catch((error) => {
          res
            .status(400)
            .json({ message: "An error occurred", error: error.message });
        });
    }
  }
};

exports.deleteUser = async (req, res, next) => {
  const { id } = req.body;
  await User.findByIdAndDelete(id);
  return "User removed";
};
