const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const Board = require("../../models/Board");
const uploadCloud = require("../../config/cloudinary-setup");

// Route to open user profile
router.get("/profile/details", (req, res, next) => {
  res.render("users/userProfile");
});

// Route to userProfile details
router.get("/profile", (req, res, next) => {
  User.findById(req.session.user._id)
    .populate("userBoards")
    .then(userFound => {
      console.log({ userFound, boards: userFound.userBoards });
      req.session.user = userFound;
      res.redirect("/users/profile/details");
    })
    .catch(err => console.log(err));
});

// Route to get another user Profile
router.get("/profile/:userId", (req, res, next) => {
  User.findById(req.params.userId)
    .populate("userBoards")
    .then(userFromDB => {
      console.log(userFromDB);
      res.render("users/otherUserProfile", {userFromDB});
    })
    .catch(err => console.log(err));
});

// Route to update users' profile
router.post(
  "/profile/update",
  uploadCloud.single("avatar"),
  (req, res, next) => {
    if (req.file.url) {
      let updatedDetailsWithAvatar = {
        username: req.body.username,
        email: req.body.email,
        avatar: req.file.url
      };
      User.findByIdAndUpdate(req.session.user._id, updatedDetailsWithAvatar, {
        new: true
      })
        .then(updatedUser => {
          console.log(updatedUser);
          req.session.user = updatedUser;
          res.locals.currentUser = req.session.user;
          res.redirect(`/users/profile`);
        })
        .catch(err => console.log(err));
    } else {
      User.findByIdAndUpdate(req.session.user._id, req.body, { new: true })
        .then(updatedUser => {
          console.log(updatedUser);
          req.session.user = updatedUser;
          res.locals.currentUser = req.session.user;
          res.redirect(`/users/profile`);
        })
        .catch(err => console.log(err));
    }
  }
);

// Route to open another users' profile
router.get("/profile/:userId", (req, res, next) => {
  User.findById(req.params.userId)
    .then(userFromDB => {
      res.render("users/userProfile", { userFromDB });
    })
    .catch(err => next(err));
});

// Route to delete user profile
router.post("/profile/delete", (req, res, next) => {
  User.findByIdAndRemove(req.session.user._id)
    .then(() => {
      req.session.destroy();
      res.redirect("/");
    })
    .catch(err => {
      console.log(`Error while deleting user from database: ${err}`);
    });
});

// Route to add the follower
router.post("/follow/:userId", (req, res, next) => {
    User.findByIdAndUpdate(req.params.userId, {$push: {"userFollower": }})
});

//Temporary route to display all users
router.get("/allUsers", (req, res, next) => {
  User.find({})
    .then(usersFromDB => {
      console.log(usersFromDB);
      res.render("users/allUsers", { usersFromDB });
    })
    .catch(err => console.log(err));
});

module.exports = router;
