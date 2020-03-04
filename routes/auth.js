const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");
const uploadCloud = require("../config/cloudinary-setup");

const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.get("/login", (req, res, next) => {
  res.render("auth/login", { message: req.flash("error") });
});

router.post("/login", (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then(userFromDB => {
      if (userFromDB === null) {
        res.render("auth/login", {
          message: "That username was not found in the system"
        });
        return;
      }
      if (bcrypt.compareSync(req.body.password, userFromDB.password)) {
        req.session.user = userFromDB;
        res.locals.currentUser = req.session.user;
        res.redirect("/");
      } else {
        res.render("auth/login", { message: "Incorrect Password" });
        return;
      }
    })
    .catch(err => next(err));
});

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

// user signup
router.post("/signup", uploadCloud.single("avatar"), (req, res, next) => {
  console.log("file: ", req.file);
  const { username, email, password } = req.body;
  if (username === "" || email === "" || password === "") {
    res.render("auth/signup", {
      message: "Missing required information"
    });
    return;
  }
  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", {
        message: "The username already exists"
      });
      return;
    }
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);
    const newUser = new User({
      username,
      email,
      avatar: req.file.url,
      password: hashPass
    });
    newUser
      .save()
      .then(newlyCreatedUser => {
        console.log(newlyCreatedUser);
        req.session.user = newlyCreatedUser;
        res.redirect("/");
      })
      .catch(err => {
        res.render("auth/signup", { message: "Something went wrong" });
      });
  });
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
