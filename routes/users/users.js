const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const Board = require("../../models/Board");
const uploadCloud = require("../../config/cloudinary-setup");

// Route to display all users
router.get("/search", (req, res, next) => {
  let searchRegEx = new RegExp(req.query.username, 'ig');
  User.find({username: searchRegEx })
    .then(usersFromDB => {
      res.render("users/allUsers", { usersFromDB });
    })
    .catch(err => console.log(err));
});

// Route to userProfile details
router.get("/profile", (req, res, next) => {
  User.findById(req.session.user._id)
    .populate({
      path: "userBoards",
      model: "Board",
      populate: {
        path: "memes",
        model: "Memes"
      }})
    .then(userFound => {
      console.log(userFound.userBoards);
      req.session.user = userFound;
      res.render("users/userProfile");
    })
    .catch(err => console.log(err));
});

// Route to get another user Profile
router.get("/profile/:userId", (req, res, next) => {
  User.findById(req.params.userId)
    .populate({
      path: "userBoards",
      model: "Board",
      populate: {
        path: "memes",
        model: "Memes"
      }})
    .populate("followers")
    .populate("following")
    .then(userFromDB => {
      let isFollowing = userFromDB.followers.find(follower => {
        return follower._id + "" === req.session.user._id + "";
      })
        ? true
        : false;
        if (isFollowing) {
          res.render("users/otherUserProfile", { userFromDB, message: "User already followed." });
        } else {
          res.render("users/otherUserProfile", { userFromDB });
        }
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
          req.session.user = updatedUser;
          res.locals.currentUser = req.session.user;
          res.redirect(`/users/profile`);
        })
        .catch(err => console.log(err));
    } else {
      User.findByIdAndUpdate(req.session.user._id, req.body, { new: true })
        .then(updatedUser => {
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

//Route to add the follower
router.post("/follow", (req, res, next) => {
  User.findByIdAndUpdate(
    req.body.otherUserId,
    { $push: { followers: req.body.currentUserId } },
    { new: true }
  )
    .then(updatedUser => {
      console.log("updatedUser ===>", updatedUser);
      User.findByIdAndUpdate(
        req.body.currentUserId,
        { $push: { following: req.body.otherUserId } },
        { new: true }
      )
        .then(() => {
          res.redirect("back");
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

//Route to remove the follower
router.post("/unfollow", (req, res, next) => {
  User.findByIdAndUpdate(
    req.body.otherUserId,
    { $pull: { followers: req.body.currentUserId } },
    { new: true }
  )
    .then(updatedUser => {
      User.findByIdAndUpdate(
        req.body.currentUserId,
        { $pull: { following: req.body.otherUserId } },
        { new: true }
      )
        .then(() => {
          res.redirect("back");
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});



module.exports = router;
