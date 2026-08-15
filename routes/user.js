const express = require("express");
const router = express.Router();
const User = require("../models_1/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");
const {
  signup,
  renderSignupForm,
  renderLoginForm,
  login,
} = require("../controllers/users.js");

//Route--> "/signup"

router
  .route("/signup")

  //Signup Form
  .get(userController.renderSignupForm)

  //Signup
  .post(wrapAsync(userController.signup));

// Route--> "/login"
router
  .route("/login")
  //Login Form
  .get(userController.renderLoginForm)

  //Login
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.login,
  );

//Logout
router.get("/logout", userController.logout);

module.exports = router;
