const express = require("express");

const router = express.Router();
const { adminAuth } = require("../middleware/auth");

const { register, login, update, deleteUser } = require("./auth");
router.route("/register").post(register);

router.route("/login").post(login);
router.route("/update").put(adminAuth, update);
router.route("/deleteUser").delete(adminAuth, deleteUser);

module.exports = router;

// function isLoggedIn(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect("/");
// }

// function notLoggedIn(req, res, next) {
//     if (req.isAuthenticated()) {
//       return next();
//     }
//     res.redirect("/");
//   }
